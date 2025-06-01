'use client';

import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import Footer from '@/components/Footer';

type Thread = {
    id: string;
    user_email: string;
    name: string;
    content: string;
    class_id: string;
};
// class_id should be a prop
const Page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [activeThread, setActiveThread] = useState<Thread>(null);
  const [showThreadsList, setShowThreadsList] = useState(true);
  const [openThread, setOpenThread] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
        async function getThreads(){
            try{const res = await fetch('/api/create/thread?class_id=000048ff-3e78-4c34-b9fe-cfd396105910');
            const data = await res.json();
            setThreads(data);
            } catch(error){
                console.error("Error", error);
            } finally{
                setLoading(false)
            }
        }
        getThreads();
    }, []);

  const handleOpenForm = () => {
    setShowCreateThread(true);
    setShowThreadsList(false);
  };

  const handleCloseForm = () => {
    setShowCreateThread(false);
    setShowThreadsList(true);
  };

  const openActiveThread = (newThread:Thread) => {
    setShowThreadsList(false);
    setShowCreateThread(false);
    setActiveThread(newThread);
    setOpenThread(true);
  }

  return (
    <div className="p-[5%]">
        <div className="flex gap-[28px] items-center">
            <h1 className="text-[40px] font-bold">ECS 162</h1>
            <button type="submit" className="bg-[#D9D9D9] text-black text-[16px] h-[36px] rounded px-4 py-2">+ Add to Dashboard</button>
        </div>
        <div className="flex justify-end absolute top-24 right-20">
            <div className="bg-[#D9D9D9] max-w-fit p-1 rounded-[8px]">
                <button type="submit" className="bg-white text-black text-[18px] rounded px-4 py-2">Discussion</button>
                <button type="submit" className="bg-[#D9D9D9] text-black text-[18px] rounded px-4 py-2">Notes</button>
            </div>
        </div>
        <div className={`border rounded-lg mt-16 bg-[#EAEAEA] px-5 py-5 ${showThreadsList ? '' : 'hidden'}`}>
            <button type="button" onClick={handleOpenForm} className="bg-[#D9D9D9] text-black text-[16px] rounded px-4 py-2">+ Create thread</button>
            {/* temporary loading message */}
            {loading && (
                <p className="py-4">Loading threads...</p>
            )}
            {threads.map(thread => (
                <div key={thread.id} onClick={() => openActiveThread(thread)} className="role=button py-5 px-5 bg-white rounded-[10px] mt-5 cursor-pointer">
                    <Comment type="preview" user_email="sooperlayne" title={thread.name} content={thread.content}/>
                </div>
            ))}
            
            
            
        </div>
        

        {showCreateThread &&(
            <div className={`${!showCreateThread ? 'hidden' : ''}  mt-16 `}>
                <DiscussionForm classId="000048ff-3e78-4c34-b9fe-cfd396105910" onCreateThread={openActiveThread} onCancel={handleCloseForm}/>
            </div>
        )}
        
        
        {openThread && (
            <div className="left-[64px] bg-white mt-16">
            <DiscussionThread thread={activeThread}/>
            </div>
        )}

    <Footer></Footer>
    </div>
  )
}

export default Page