import { Class, Document, Post, Thread, User } from "./types";

export const fetchUser =  async (email:string): Promise<User> => {
    const res = await fetch(`/api/fetch/user`, {
        method: 'POST', 
        body: JSON.stringify({email})
    });
    const data = await res.json();
    return data;
}

export const fetchDocuments = async (class_id: string): Promise<Document[] | {message: string}> => {
    const res = await fetch(`/api/fetch/class/documents`, {
        method: 'POST', 
        body: JSON.stringify({class_id})
    });
    const data = await res.json();
    return data;
}


export const fetchThreads = async (class_id: string): Promise<Thread[] | {message: string}> => {
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
    const presignedRes = await fetch(`/api/create/document`, {
        method: 'POST',
        body: JSON.stringify({
            fileName,
            fileType: file.type,
            class_id,
            user_email
        })
    });

    if (!presignedRes.ok) {
        console.error('Presigned URL request failed:', {
            status: presignedRes.status,
            statusText: presignedRes.statusText
        });
        throw new Error('Failed to get presigned URL');
    }

    console.log('Successfully got presigned URL response');
    const { presignedUrl, document } = await presignedRes.json();
    console.log('Parsed presigned URL data:', {
        presignedUrl,
        documentId: document.id, // Assuming document has an id
        documentMetadata: document
    });

    // Upload the file to S3 using the presigned URL
    console.log('Starting S3 upload with file:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
    });

    const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type
        }
    });

    if (!uploadRes.ok) {
        console.error('S3 upload failed:', {
            status: uploadRes.status,
            statusText: uploadRes.statusText,
            responseHeaders: Object.fromEntries(uploadRes.headers.entries())
        });
        throw new Error('Failed to upload file to S3');
    }

    console.log('Successfully uploaded file to S3');
    console.log('Returning document metadata:', document);
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

export const fetchClass = async (class_id: string): Promise<Class | {message: string}> => {
    const res = await fetch(`/api/fetch/class`, {
        method: 'POST',
        body: JSON.stringify({ class_id })
    });
    const data = await res.json();
    return data;
}