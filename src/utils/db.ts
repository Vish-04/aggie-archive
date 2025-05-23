import { Document, Post, Thread, User } from "./types";

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
    const res = await fetch(`/api/fetch/class/threads`, {
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


export const createPost = async (content: string, user_email: string, thread_id: string, class_id: string): Promise<Post> => {
    const res = await fetch(`/api/create/post`, {
        method: 'POST', 
        body: JSON.stringify({content, user_email, thread_id, class_id})
    });
    const data = await res.json();
    return data;
}