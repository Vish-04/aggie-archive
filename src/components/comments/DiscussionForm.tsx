'use client'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';


export default function DiscussionForm({ onSubmit }) {
    
    return (
      <div className="bg-white border border-[#B0B0B0] rounded-lg font-sans px-[3%] py-[4%]">
        <h1 className="text-3xl font-bold text-left mb-8">Create a thread</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <textarea
            name="Title"
            required
            placeholder="Title"
            className="border border-[#B0B0B0] rounded h-[59px] text-[20px] p-3 resize-none "
          />
          <textarea 
            name="Text"
            required
            placeholder="Text"
            className="border border-[#B0B0B0] rounded p-3 text-[20px] h-[291px] resize-none"
          />
          <div className="flex gap-[17px] ml-auto mt-[15px]">
            <button type="button" className="bg-[#D9D9D9] text-black rounded px-4 py-2 text-[20px]">Cancel</button>
            <button type="submit" className="bg-[#D9D9D9] text-black rounded px-4 py-2 text-[20px]">
              Create thread
            </button>
          </div>
        </form>
      </div>
    )
}

