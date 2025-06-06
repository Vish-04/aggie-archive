'use client';

import Footer from '@/components/Footer';
import Header from '@/components/DummyHeader';
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
            <Header></Header>
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
                    {documents.map((document) => (
                        <Files key={document.id} document={document} />
                    ))}
                    
                </div>

            </div>

            <Footer></Footer>

        </div>
        
    );

}