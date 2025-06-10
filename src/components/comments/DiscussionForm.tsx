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
      if (!user?.email) {
        console.error('User email is not available');
        return;
      }
      try {
        const response = await createThread(title, classId, text, user.email);
  
        
        setTitle('');
        setText('');
        
        onCreateThread(response);

        
      } catch (err) {
        console.error('Error:', err);
      }
    }
    return (
      <div className="bg-white border border-[#CCCCFF] rounded-[10px] font-sans px-6 py-8 md:px-12 md:py-14">
        <h1 className="text-2xl md:text-3xl text-left pb-6 md:pb-8 font-[600]">Create a thread</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="border border-[#CCCCFF] placeholder-[#AB97CC] rounded h-12 md:h-[59px] text-[20px] font-[400] px-3 py-2 md:px-4 md:py-3 resize-none"
          />
          <textarea 
            name="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Text"
            className="border border-[#CCCCFF] font-[400] rounded p-3 md:px-4  text-[20px] placeholder-[#AB97CC] h-48 md:h-[291px] resize-none"
          />
          <div className="flex md:gap-[17px] ml-auto pt-[15px]">
            <button type="button" onClick={onCancel} className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] scale-[0.85] md:scale-100 rounded px-4 py-2 text-[20px]">Cancel</button>
            <button type="submit" className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] scale-[0.85] md:scale-100 rounded px-4 py-2 text-[20px]">
              Create thread
            </button>
          </div>
        </form>
      </div>
    )
}

