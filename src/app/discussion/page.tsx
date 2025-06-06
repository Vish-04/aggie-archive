'use client';

import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import Footer from '@/components/Footer';
import Link from 'next/link';


type Thread = {
    id: string;
    user_name: string;
    name: string;
    content: string;
    class_id: string;
};
// class_id should be a prop
const Page = () => {
  const { user } = useUser();
  console.log(user);
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
            <button type="submit" className="bg-[#8347E7] font-sans-400 text-white text-[16px] h-[36px] rounded px-4 py-2">+ Add to Dashboard</button>
        </div>
        <div className="flex justify-end absolute top-24 right-20">
            <div className="bg-[#ECEEF8] text-[#483183] w-[238px] text-[18px] p-1 rounded-[8px]">
                <Link href="/discussion" className="bg-white text-[18px] text-center w-[135px] rounded px-4 py-2 inline-block">Discussion</Link>
                <Link href="/notes" className="text-[18px] rounded px-4 py-2 ml-2 text-center inline-block">Notes</Link>
            </div>
        </div>
        <div className={`rounded-lg mt-16  px-5 py-5 ${showThreadsList ? '' : 'hidden'}`}>
            <button type="button" onClick={handleOpenForm} className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] px-6 py-2">+ Create thread</button>
            {/* temporary loading message */}
            {loading && (
                <p className="py-4">Loading threads...</p>
            )}
            {threads.map(thread => (
                <div key={thread.id} onClick={() => openActiveThread(thread)} className="role=button px-8 py-5 bg-white border border-[#CCCCFF] rounded-[10px] mt-5 cursor-pointer">
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
