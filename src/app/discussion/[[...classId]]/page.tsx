'use client';

import React, { useState, useEffect } from 'react'
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import { Class, Thread } from '@/utils/types';
import { fetchClass, fetchThreads } from '@/utils/db';
import { useParams, useRouter } from 'next/navigation';
import InvalidPage from '@/components/InvalidPage';


// class_id should be a prop
const Page = () => {
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
  //moved this outside so i can call it later after user creates a new thread so they can see new thread when they click "back to discussion" without refreshing
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
  useEffect(() => {
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
    getThreads();
  }

  if (invalidClass) {
    return <InvalidPage />;
  }

  return (
    
    <div>
      <div className="pl-[69px] pr-[51px]">
        <div className="absolute flex gap-[28px] top-[140px] h-[52px] left-[69px] items-center">
          {/* Course code (i.e., ECS162) */}
            <h1 className="text-[40px] h-[52px] font-bold">{classData?.course_code}</h1>
          {/* Add to dashboard button */}
            <button type="submit" className="bg-[#8347E7] font-[400] text-white text-[16px] rounded w-[178px] h-[36px]">+ Add to Dashboard</button>
        </div>
        {/* "Discussion" and "Notes" toggle */}
        <div className="flex justify-end absolute top-[140px] right-[60px]">
            <div className="bg-[#ECEEF8] text-[#483183] font-medium w-[238px] p-1 rounded-[8px]">
                <button type="submit" className="bg-white text-[18px] w-[135px] h-[39px] rounded px-4 py-2" onClick={() => router.push(`/discussion/${classId}`)}>Discussion</button>
                <button type="submit" className="text-[18px] rounded h-[39px] px-5 py-2" onClick={() => router.push(`/notes/${classId}`)}>Notes</button>
            </div>
        </div>
        {/* Display Back to Discussion button*/}
        {openThread && (
                
                <button type="submit" className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] absolute top-[227px] text-[16px] rounded-[6px]  h-[36px] px-6 py-1" 
                onClick={() => {
                    setOpenThread(false)
                    setShowThreadsList(true);
                    setShowCreateThread(false);
                    setActiveThread(null);
                }}>Back to Discussion</button>
        )}

        <div className={`rounded-lg mt-[135px] py-5 ${showThreadsList ? '' : 'hidden'}`}>
            <button type="button" onClick={handleOpenForm} className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] absolute top-[227px] text-[16px] rounded-[6px] h-[36px] w-[154px]">+ Create thread</button>
            {/* temporary loading message */}
            {loading && (
                <p className="py-16">Loading threads...</p>
            )}
            <div className="flex flex-col gap-[17px] pt-8 ">
              {threads.map(thread => (
                  <div key={thread.id} onClick={() => openActiveThread(thread)} className="role=button px-8 py-5 bg-white border border-[#CCCCFF] rounded-[10px] cursor-pointer">
                      <Comment type="preview" user_email={thread.user_email} title={thread.name} content={thread.content}/>
                  </div>
              ))}   
            </div>  
        </div>
        

        {showCreateThread &&(
            <div className={`${!showCreateThread ? 'hidden' : ''}  mt-16 `}>
                <DiscussionForm classId={classId} onCreateThread={openActiveThread} onCancel={handleCloseForm}/>
            </div>
        )}
        
        
        {openThread && activeThread && (
            <div className="left-[64px] bg-white mt-16">
            <DiscussionThread thread={activeThread}/>
            </div>
        )}
    </div>
    </div>
    
  )
}

export default Page
