//This component is for when a user clicks onto a thread to view the full thread discussion with comments
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';
import { createPost, fetchPosts } from '@/utils/db';
import { Post, Thread } from '@/utils/types';

type CommentProps = {
  thread: Thread;
  setOpenThread: (openThread: boolean) => void;
};

const DiscussionThread: React.FC<CommentProps> = ({ thread, setOpenThread }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [focused, setFocused] = useState(false);
  const [comments, setComments] = useState<Post[]>([]);


  // fetch comments under a specific thread from database
  const getComments = useCallback(async () => {
    try{
      const res = await fetchPosts(thread.id);
      console.log("COMMENTS",res);
      setComments(res);
    } catch(err){
      console.error("Error:", err);
    }
  }, [thread.id]);

    useEffect(() => {
      getComments();
      setLoading(false);
    }, [getComments]);

  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    try{
        const response = await createPost(text, user?.email!, thread.id, thread.class_id);
        console.log(response);
        
        setText('');
        await getComments();
    } catch(err){
        console.error("Error:", err);
    }
} 
  return (
    <div className="bg-white mt-[185px] border border-[#CCCCFF] font-dm px-10 py-10 rounded-lg  flex flex-col gap-[20px]">

      <Comment user_email={thread.user_email} title={thread.name} content={thread.content}/>

      <form onSubmit={handleSubmit}>
        <textarea
            name="Comment"
            value={text}
            required
            placeholder="Add comment..."
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`border border-[#B0B0B0]  placeholder-[#AB97CC] rounded p-4 text-[16px] resize-none w-full mt-[10px] transition-all duration-300
            ${focused || text ? 'h-52' : 'h-14'} overflow-hidden`}
            style={{ minHeight: 48, border: '1px solid #CCCCFF' }}
          />
        {/* only display 'Post comment' if user types something inside comment form */}
        {text.trim() !== '' && (
          <div className="flex gap-[10px] mb-3">
            <button
              type="submit"
              className="bg-[#8347E7] text-white rounded-[6px] px-4 py-1.5 my-2.5 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Post comment
            </button>
            <button onClick={() => setText('')} type="button" className="bg-[#ECEEF8] text-[#483183] border border-[#483183] rounded-[6px] px-4 py-1.5 my-2.5 cursor-pointer">Cancel</button>
          </div>
  
)}
      </form>
      {/* temporary loading message */}
      {loading && (
        <p className="py-4">Loading comments...</p>
      )}
      <div className="relative left-[-9]">
        {/* display every top-level comment under thread */}
        {comments.map(comment => (
          <div key={comment.id} className="mb-2">
            <Comment type="reply" title="placeholder" user_email={comment.user_email} content={comment.content}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiscussionThread