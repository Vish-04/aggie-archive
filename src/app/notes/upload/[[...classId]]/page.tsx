'use client';


import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchClass, uploadFile } from '@/utils/db';
import { Class } from '@/utils/types';
import { File, UploadIcon } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import InvalidPage from '@/components/InvalidPage';

export default function Upload(){
    const router = useRouter();
    const params = useParams();
  const classId = params.classId?.[0] || 'No Class ID';
  const [classData, setClassData] = useState<Class | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [invalidClass, setInvalidClass] = useState(false);

  const { user } = useUser();
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

  if (invalidClass) {
    return <InvalidPage />;
}

    return(
        <div>   
            <div className="flex justify-between items-center px-4 sm:px-16 py-10">
                <div className="flex items-center gap-8">
                    <h1 className='font-bold  text-[26px] sm:text-[36px]'>{classData?.course_code}</h1>
                </div>
                <div className="flex gap-2 bg-blueGray p-1 rounded-lg">
                    {/* can change it here when we merge to main to the actual discussion page */}
                    <button onClick={() => router.push(`/discussion/${classId}`)}
                     className="p-2 rounded-lg">Discussion</button> 
                    <button onClick={() => router.push(`/notes/${classId}`)}
                     className="bg-white py-2 px-4 rounded-lg">Notes</button>
                </div>
            </div>
             <div className="flex justify-between items-center px-4 sm:px-16 sm:pb-16 ">
                <div className=' border-0 sm:border border-periwinkle w-full h-full rounded-lg sm:p-12 '>
                    <h1 className='font-bold text-[20px] sm:text-[32px] sm:pb-8 pb-2'>Upload a note</h1>
                    <div className='flex flex-col'>
                        {/* I made it not resizeable here but it can be changed just remove it */}
                        <textarea className=" w-full h-full  leading-none border border-periwinkle rounded-lg text-[20px] px-6 pt-4 pb-0 resize-none mb-4 placeholder-periwinkle" name="Title" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                        <div className='pt-4'>
                            <label className='w-full h-[330px] cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-periwinkle rounded-lg hover:border-periwinkle transition-colors'>
                                {!selectedFile ? (
                                    <>
                                        <div className='flex flex-col items-center justify-center gap-4'>
                                            <UploadIcon className='w-10 h-10 stroke-darkPurple' />
                                            <span className="text-darkPurple text-2xl"><span className='font-bold'>Choose file</span> to upload</span>
                                            <span className="text-darkPurple">Accepted file format: PDF</span>
                                        </div>
                                        
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <File className="mb-4 w-16 h-16" />
                                        <span className="text-gray-700">{selectedFile.name}</span>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFile(null);
                                            }}
                                            className="mt-2 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            if (file.type !== 'application/pdf') {
                                                alert('Please upload a PDF file');
                                                e.target.value = '';
                                                return;
                                            }
                                            setSelectedFile(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        <div className='flex flex-row justify-between sm:justify-end sm:gap-4 py-2 pt-8'>
                            {/* for now the cancel button reroutes to notes page but can change it so that if the user uploads a file but doesn't want it then it will be gone */}
                            <button className='bg-blueGray border border-purple px-4 py-2 rounded-lg text-[20px] text-darkPurple'
                                onClick={() => router.push('/notes')}>
                                Cancel
                            </button>
                            <button 
                            className='bg-blueGray border border-purple px-4 py-2 rounded-lg text-darkPurple text-[20px]'
                            onClick={async () => {
                                if(selectedFile && user && user.email){
                                    const res = await uploadFile(selectedFile, title, classId, user.email);
                                    console.log(res);
                                    if('message' in res){
                                        alert(res.message);
                                    } else {
                                        router.push(`/notes/${classId}`);
                                    }
                                }
                            }}>Upload File</button>
                        </div>
                        

                    </div>
                   
                   
                   
                </div>

            </div>


        </div>
        
    );

}