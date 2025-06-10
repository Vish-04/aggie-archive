'use client';


import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

      <div className="flex justify-between items-center sm:pb-10">
        <div className=' border-0 sm:border border-periwinkle w-full h-full rounded-lg sm:p-12 '>
          <h1 className='font-bold text-[24px] sm:text-[32px] pb-6 md:pb-10'>Upload a note</h1>
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
              <button className='bg-purple border border-brightPurple px-4 py-2 rounded-lg text-[20px] text-darkPurple'
                      onClick={() => router.push('/notes')}>
                Cancel
              </button>
              <button
                className='bg-purple border border-brightPurple px-4 py-2 rounded-lg text-darkPurple text-[20px]'
                onClick={async () => {
                  if (!title.trim()) {
                    alert('Please enter a title for your document');
                    return;
                  }
                  if(selectedFile && user && user.email){
                    console.log("selectedFile", selectedFile);
                    console.log("title", title);
                    console.log("classId", classId);
                    console.log("user.email", user.email);
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