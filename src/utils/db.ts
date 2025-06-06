import { Class, Document, Post, Thread, User } from "./types";

export const fetchUser =  async (email:string): Promise<User> => {
    const res = await fetch(`/api/fetch/user`, {
        method: 'POST', 
        body: JSON.stringify({email})
    });
    const data = await res.json();
    return data;
}

export const fetchDocuments = async (class_id: string): Promise<Document[]> => {
    const res = await fetch(`/api/fetch/class/documents`, {
        method: 'POST', 
        body: JSON.stringify({class_id})
    });
    const data = await res.json();
    return data;
}


export const fetchThreads = async (class_id: string): Promise<Thread[]> => {
    const res = await fetch(`/api/fetch/class/thread`, {
        method: 'POST', 
        body: JSON.stringify({class_id})
    });
    const data = await res.json();
    return data;
}


export const fetchPosts = async (thread_id: string): Promise<Post[]> => {
    const res = await fetch(`/api/fetch/class/thread/posts`, {
        method: 'POST', 
        body: JSON.stringify({thread_id})
    });
    const data = await res.json();
    return data;
}

export const createThread = async (name: string, class_id: string, content: string, user_email: string): Promise<Thread> => {
    const res = await fetch(`/api/create/thread`, {
        method: 'POST', 
        body: JSON.stringify({name, class_id, content, user_email})
    });
    const data = await res.json();
    return data;
}


export const createPost = async (content: string, user_email: string, thread_id: string, class_id: string): Promise<Post> => {
    console.log(content, user_email, thread_id, class_id);
    const res = await fetch(`/api/create/post`, {
        method: 'POST', 
        body: JSON.stringify({content, user_email, thread_id, class_id})
    });
    const data = await res.json();
    return data;
}

export const uploadFile = async (
    file: File,
    fileName: string,
    class_id: string,
    user_email: string
): Promise<Document> => {
    // First, get the presigned URL
    const presignedRes = await fetch(`/api/create/presigned-url`, {
        method: 'POST',
        body: JSON.stringify({
            fileName,
            fileType: file.type,
            class_id,
            user_email
        })
    });

    if (!presignedRes.ok) {
        throw new Error('Failed to get presigned URL');
    }

    const { presignedUrl, document } = await presignedRes.json();

    // Upload the file to S3 using the presigned URL
    const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    if (!uploadRes.ok) {
        throw new Error('Failed to upload file to S3');
    }

    return document;
}

export const updateUser = async (email: string, updateData: Partial<User>): Promise<User> => {
    const res = await fetch(`/api/update/user`, {
        method: 'PUT',
        body: JSON.stringify({ email, ...updateData })
    });
    if (!res.ok) {
        throw new Error('Failed to update user');
    }
    const data = await res.json();
    return data;
}

export const fetchClass = async (class_id: string): Promise<Class> => {
    const res = await fetch(`/api/fetch/class`, {
        method: 'POST',
        body: JSON.stringify({ class_id })
    });
    const data = await res.json();
    return data;
}