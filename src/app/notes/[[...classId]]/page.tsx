'use client';


import Files from '@/components/Files';
import InvalidPage from '@/components/InvalidPage';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
        <div>   
          {/* the Top header part */}
            <div className="flex justify-between items-center sm:px-16 px-8 py-10">
                <div className="flex items-center gap-8">
                    <h1 className='font-bold text-[20px] sm:text-[36px]'>{classData?.course_code}</h1>
                </div>
                <div className="flex gap-2 bg-blueGray p-1 rounded-lg">
                    <button onClick={() => router.push(`/discussion/${classId}`)}
                     className="p-2 rounded-lg">Discussion</button>
                    <button className="bg-white py-2 px-4 rounded-lg" onClick={() => router.push(`/notes/${classId}`)}>Notes</button>
                </div>
            </div>

             <div className="flex justify-between items-center sm:px-16 px-8">
                <div className='flex flex-wrap gap-8 sm:gap-y-20 gap-y-16 bg-blueGray w-full h-full rounded-lg p-4 sm:p-8 pb-16'>
                     <button onClick={() => router.push(`/notes/upload/${classId}`)}
                    className=" sm:w-[192px] sm:h-[255px] w-[120px] h-[176px]">
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