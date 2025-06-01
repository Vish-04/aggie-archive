//This component is for when a user clicks onto a thread to view the full thread discussion with comments
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';

// for thread
type Thread = {
  id: string;
  user_email: string;
  name: string;
  content: string;
  class_id: string;
};

// for comment
type Post = {
  id: string;
  user_email: string;
  content: string;
  class_id: string;
  parent_id?: string;
  thread_id: string;
  deleted: boolean;
};

type CommentProps = {
  thread: Thread;
};

const DiscussionThread: React.FC<CommentProps> = ({ thread }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [focused, setFocused] = useState(false);
  const [comments, setComments] = useState<Post[]>([]);

  // fetch comments under a specific thread from database
  const getComments = useCallback(async () => {
    const res = await fetch(`/api/create/post?thread_id=${thread.id}`);
    const data = await res.json();
    setComments(data);
  }, [thread.id]);

    useEffect(() => {
      getComments();
      setLoading(false);
    }, [getComments]);

  
  async function handleSubmit(e){
    e.preventDefault();
    try{
        const response = await fetch('/api/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: text,
                class_id: thread.class_id,
                user_email: user.email,
                thread_id: thread.id,
                deleted: false,
                parent_id: null,
            })
        })
        if(!response.ok){
          const { message } = await response.json();
          throw new Error(message || 'Error');
        }
        setText('');
        await getComments();
    } catch(err){
        console.error("Error:", err);
    }
} 
  return (
    <div className="bg-white font-dm px-10 py-10 border rounded-lg border-[#B0B0B0] flex flex-col gap-[20px]">

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
            className={`border border-[#B0B0B0] rounded p-2 text-[16px] resize-none w-full mt-[10px] transition-all duration-300
            ${focused || text ? 'h-48' : 'h-12'} overflow-hidden`}
            style={{ minHeight: 48 }}
          />
        {/* only display 'Post comment' if user types something inside comment form */}
        {text.trim() !== '' && (
  <button
    type="submit"
    className="bg-gray-200 text-black rounded px-4 py-2 mt-[10px] transition-all duration-300 ease-in-out cursor-pointer"
  >
    Post comment
  </button>
)}
      </form>
      {/* temporary loading message */}
      {loading && (
        <p className="py-4">Loading comments...</p>
      )}
      {/* display every top-level comment under thread */}
      {comments.map(comment => (
        <Comment key={comment.id} type="reply" title="placeholder" user_email="sooperlayne" content={comment.content}/>
      ))}
    </div>
  )
}

export default DiscussionThread