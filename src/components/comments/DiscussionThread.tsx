//This component is for when a user clicks onto a thread to view the full thread discussion with replies
'use client';

import React, { useState } from 'react';
import Comment from '@/components/comments/Comment';

const DiscussionThread = () => {
  const [text, setText] = useState('');
  return (
    <div className="bg-white font-dm px-10 py-10 border rounded-lg border-[#B0B0B0] flex flex-col gap-[20px]">

      <Comment/>

      <form>
        <textarea
            name="Comment"
            required
            placeholder="Add comment..."
            // comment form expands when user clicks into it
            className="border border-[#B0B0B0] rounded p-2 text-[16px] resize-none w-full mt-[10px] h-12 focus:h-48 transition-all duration-300"
            onChange={(e) => setText(e.target.value)}
          />
        {/* only display 'Post comment' if user types something inside comment form */}
        <button
          type="submit"
          className={`bg-gray-200 text-black rounded px-4 py-2 transition-opacity duration-200 mt-[10px]
            ${text.trim() === '' ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
          Post comment
        </button>
      </form>
      {/* to be implemented: loop through and render replies using Comment component with type 'reply'*/}
    </div>
  )
}

export default DiscussionThread