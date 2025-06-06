'use client'
import React, { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import { Thread } from '@/utils/types';
import { createThread } from '@/utils/db';

  type DiscussionFormProps = {
  classId: string;
  onCancel: () => void;
  onCreateThread: (thread: Thread) => void;
}


export default function DiscussionForm({ classId, onCancel, onCreateThread }: DiscussionFormProps) {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try{
        const response = await createThread(title, classId, text, user?.email!);
  
        
        setTitle('');
        setText('');
        
        onCreateThread(response);

        
      } catch (err) {
        console.error('Error:', err);
      }
    }
    return (
      <div className="bg-white border border-[#B0B0B0] rounded-[10px] font-sans px-[3%] py-[4%]">
        <h1 className="text-3xl font-bold text-left mb-8">Create a thread</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="border border-[#B0B0B0] rounded h-[59px] text-[20px] p-3 resize-none "
          />
          <textarea 
            name="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Text"
            className="border border-[#B0B0B0] rounded p-3 text-[20px] h-[291px] resize-none"
          />
          <div className="flex gap-[17px] ml-auto mt-[15px]">
            <button type="button" onClick={onCancel} className="bg-[#D9D9D9] text-black rounded px-4 py-2 text-[20px]">Cancel</button>
            <button type="submit" className="bg-[#D9D9D9] text-black rounded px-4 py-2 text-[20px]">
              Create thread
            </button>
          </div>
        </form>
      </div>
    )
}

