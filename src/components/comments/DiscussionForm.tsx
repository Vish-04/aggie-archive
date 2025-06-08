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
      <div className="bg-white border border-[#CCCCFF] mt-[145px] h-[629px] rounded-[10px] px-10 py-12">
        <h1 className="text-[32px] text-left mb-8 font-semibold">Create a thread</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className=" w-full h-full leading-none border border-[#CCCCFF]  placeholder-[#AB97CC] rounded-lg text-[20px] px-6 pt-4 pb-0 resize-none"
          />
         
          <textarea 
            name="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="Text"
            className="border border-[#CCCCFF] font-[400] rounded px-6 py-4 text-[20px] placeholder-[#AB97CC] min-h-[291px] resize-none"
          />
          <div className="flex gap-[17px] ml-auto mt-[15px] font-[500]">
            <button type="button" onClick={onCancel} className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] rounded-[8px] px-4 py-1  text-[20px]">Cancel</button>
            <button type="submit" className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] rounded-[8px] px-4 py-1.5 text-[20px]">
              Create thread
            </button>
          </div>
        </form>
      </div>
    )
}

