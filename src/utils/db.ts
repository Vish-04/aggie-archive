import { Class, Document, Post, Thread, User } from "./types";

export const fetchUser =  async (email:string): Promise<User> => {
    const res = await fetch(`/api/fetch/user`, {
        method: 'POST', 
        body: JSON.stringify({email})
    });
    const data = await res.json();
    return data;
}

export const fetchClasses = async (): Promise<Class[]> => {
    const res = await fetch(`/api/fetch/classes`);
    const data = await res.json();
    return data;
}

