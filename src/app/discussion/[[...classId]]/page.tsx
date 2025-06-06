'use client';

import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Class, Thread } from '@/utils/types';
import { fetchClass, fetchThreads } from '@/utils/db';
import { useParams, useRouter } from 'next/navigation';
import InvalidPage from '@/components/InvalidPage';


// class_id should be a prop
const Page = () => {
  const { user } = useUser();
  const router = useRouter();

//   console.log(user);
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [showThreadsList, setShowThreadsList] = useState(true);
  const [openThread, setOpenThread] = useState<boolean>(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  
  const params = useParams();
  const classId = params.classId?.[0] || 'No Class ID';
  const [classData, setClassData] = useState<Class | null>(null);
  const [invalidClass, setInvalidClass] = useState(false);

  useEffect(() => {
    const getClass = async () => {
      const newClassData = await fetchClass(classId);
      if('message' in newClassData){
        setInvalidClass(true);
      } else {
        setClassData(newClassData);
      }
    };

    getClass();
  }, [classId]);

  useEffect(() => {
        async function getThreads(){


            try{const res = await fetchThreads(classId);

            console.log("THREADS",res);
            if('message' in res){
                setThreads([]);
            } else {
                setThreads(res);
            }
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

  if (invalidClass) {
    return <InvalidPage />;
  }

  return (
    <div className="p-[5%]">
        <div className="flex gap-[28px] items-center">
            <h1 className="text-[40px] font-bold">{classData?.course_code}</h1>
            <button type="submit" className="bg-[#8347E7] font-sans-400 text-white text-[16px] h-[36px] rounded px-4 py-2">+ Add to Dashboard</button>
        </div>
        <div className="flex justify-end absolute top-24 right-20">
            <div className="bg-[#D9D9D9] max-w-fit p-1 rounded-[8px]">
                <button type="submit" className="bg-white text-black text-[18px] rounded px-4 py-2" onClick={() => router.push(`/discussion/${classId}`)}>Discussion</button>
                <button type="submit" className="bg-[#D9D9D9] text-black text-[18px] rounded px-4 py-2" onClick={() => router.push(`/notes/${classId}`)}>Notes</button>
            </div>
        </div>
        {openThread && (
                <button type="submit" className="bg-[#D9D9D9] text-black text-[18px] rounded px-4 py-2" 
                onClick={() => {
                    setOpenThread(false)
                    setShowThreadsList(true);
                    setShowCreateThread(true);
                    setActiveThread(null);
                }}>Back to Discussion</button>
        )}
        <div className={`rounded-lg mt-16  px-5 py-5 ${showThreadsList ? '' : 'hidden'}`}>
            <button type="button" onClick={handleOpenForm} className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] px-6 py-2">+ Create thread</button>
            {/* temporary loading message */}
            {loading && (
                <p className="py-4">Loading threads...</p>
            )}
            {threads.map(thread => (
                <div key={thread.id} onClick={() => openActiveThread(thread)} className="role=button px-8 py-5 bg-white border border-[#CCCCFF] rounded-[10px] mt-5 cursor-pointer">
                    <Comment type="preview" user_email={thread.user_email} title={thread.name} content={thread.content}/>
                </div>
            ))}
            
            
            
        </div>
        

        {showCreateThread &&(
            <div className={`${!showCreateThread ? 'hidden' : ''}  mt-16 `}>
                <DiscussionForm classId={classId} onCreateThread={openActiveThread} onCancel={handleCloseForm}/>
            </div>
        )}
        
        
        {openThread && activeThread && (
            <div className="left-[64px] bg-white mt-16">
            <DiscussionThread thread={activeThread} setOpenThread={setOpenThread}/>
            </div>
        )}

    <Footer></Footer>
    </div>
  )
}

export default Page
