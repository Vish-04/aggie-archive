'use client';

import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
const Page = () => {
  const { user } = useUser()

  return (
    <div className="p-[5%]">
        <div className="flex gap-[28px] items-center">
            <h1 className="text-[40px] font-bold">Course Name</h1>
            <button type="submit" className="bg-[#D9D9D9] text-black text-[16px] h-[36px] rounded px-4 py-2">+ Add to Dashboard</button>
        </div>
        <div className="flex justify-end">
            <div className="bg-[#D9D9D9] max-w-fit p-1 rounded">
                <button type="submit" className="bg-white text-black text-[18px] rounded px-4 py-2">Discussion</button>
                <button type="submit" className="bg-[#D9D9D9] text-black text-[18px] rounded px-4 py-2">Notes</button>
            </div>
        </div>
        <div className="border rounded-lg mt-[2%] bg-[#EAEAEA] px-5 py-5">
            <button className="bg-[#D9D9D9] text-black text-[16px] rounded px-4 py-2">+ Create thread</button>
            <div className="py-5 px-5 bg-white rounded-lg mt-5">
                <Comment type="preview"/>
            </div>
            
        </div>
        <DiscussionThread/>
        <DiscussionForm onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitted!");
            }}
        />
    </div>
  )
}

export default Page