'use client';


import Files from '@/components/Files';
import InvalidPage from '@/components/InvalidPage';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { fetchClass, fetchDocuments } from '@/utils/db';
import { Class, Document } from '@/utils/types';

export default function Notes(){
    const router = useRouter();
    const params = useParams();
  const classId = params.classId?.[0] || 'No Class ID';
  const [classData, setClassData] = useState<Class | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [invalidClass, setInvalidClass] = useState(false);

  useEffect(() => {
    const getClass = async () => {
      const newClassData = await fetchClass(classId);
      console.log("newClassData", newClassData);
      if('message' in newClassData){
        setClassData(null);
        setInvalidClass(true);
      } else {
        setClassData(newClassData);
      }
    };

    getClass();
  }, [classId]);

  useEffect(() => {
    const getDocuments = async () => {
      const newDocuments = await fetchDocuments(classId);
      console.log(newDocuments);
      if('message' in newDocuments){
          setDocuments([]);
      } else {
        setDocuments(newDocuments);
      }
    };
    if(classId){
        console.log("classId", classId);
      getDocuments();
    }
  }, [classId]);
  
    if (invalidClass) {
        return <InvalidPage />;
    }

    return(
      <div className="px-6 md:px-12 lg:px-16 pt-6 md:pt-8">
        {/*Header*/}
        <div className="flex justify-between pt-4 pb-6 md:pb-8 md:py-8 lg:pb-12 lg:pt-10">
          <div className="flex gap-[28px] items-center">
            {/* Course code (i.e., ECS162) */}
            <h1 className="text-3xl md:text-[40px] font-bold">{classData?.course_code}</h1>
            {/* Add to dashboard button */}
            {/*<button type="submit" className="bg-[#8347E7] font-[400] text-white text-[16px] rounded w-[178px] h-[36px]">+*/}
            {/*	Add to Dashboard*/}
            {/*</button>*/}
          </div>
          {/* "Discussion" and "Notes" toggle */}
          <div className="flex justify-center items-center">
            <div className="bg-[#ECEEF8] text-[#483183] font-medium p-1 rounded-md md:rounded-[8px]">
              <button type="submit" className="text-[16px] md:text-[18px] rounded px-4 py-2 md:px-6 md:py-2"
                      onClick={() => router.push(`/discussion/${classId}`)}>Discussion
              </button>
              <button type="submit" className="bg-white text-[16px] md:text-[18px] rounded px-4 py-2 md:px-6 md:py-2"
                      onClick={() => router.push(`/notes/${classId}`)}>Notes
              </button>
            </div>
          </div>
        </div>

        {/*Notes*/}
        <div className="flex justify-between items-center">
          <div className='flex flex-wrap gap-8 bg-purple w-[1400px] h-[641px] rounded-lg p-8'>
            <button onClick={() => router.push(`/notes/upload/${classId}`)}
                    className=" w-[192px] h-[255px]">
              <img src="/uploadNote.svg" alt="" />
            </button>
            {documents.map((document) => (
              <Files key={document.id} document={document} />
            ))}
          </div>
        </div>
      </div>
    );

}