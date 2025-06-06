'use client';


import Files from '@/components/Files';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchClass } from '@/utils/db';
import { Class } from '@/utils/types';

export default function Notes(){
    const router = useRouter();
    const params = useParams();
  const classId = params.classId?.[0] || 'No Class ID';
  const [classData, setClassData] = useState<Class | null>(null);

  useEffect(() => {
    const getClass = async () => {
      const newClassData = await fetchClass(classId);
      setClassData(newClassData);
    };

    getClass();
  }, [classId]);
  
    return(
        <div>   
            <div className="flex justify-between items-center px-16 py-10">
                <div className="flex items-center gap-8">
                    <h1 className='font-bold text-[40px]'>{classData?.title}</h1>
                    <button className="bg-[#D9D9D9] rounded-lg p-2">+ Add to Dashboard</button>
                </div>
                <div className="flex gap-2 bg-purple p-1 rounded-lg">
                    <button onClick={() => router.push(`/discussion/${classId}`)}
                     className="p-2 rounded-lg">Discussion</button>
                    <button className="bg-white py-2 px-4 rounded-lg" onClick={() => router.push(`/notes/${classId}`)}>Notes</button>
                </div>
            </div>
             <div className="flex justify-between items-center px-16">
                <div className='flex flex-wrap gap-8 bg-purple w-[1400px] h-[641px] rounded-lg p-8'>
                     <button onClick={() => router.push(`/notes/upload/${classId}`)}
                    className=" w-[192px] h-[255px]">
                        <img src="/uploadNote.svg" alt="" />
                    </button>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                   
                </div>

            </div>

        </div>
        
    );

}