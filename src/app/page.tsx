'use client';

// React Imports
import { useState } from 'react';

// Auth0 Imports
import { useUser } from '@auth0/nextjs-auth0/client';
import Footer from '@/components/Footer';
import Blocks from '@/components/LandingPageBlocks'
import Header from '@/components/Header';


export default function Home() {
  const { user, isLoading } = useUser()

  
  if(isLoading) {
    return (
      <div className="">
        Loading...  
      </div>
    );
  } else {
    return(
      
      <div className="">

        {user ? (
          <>
            <h1>Hello {user?.name}</h1>
              <button
                  onClick={() => {
                    window.location.href = '/api/auth/logout';
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text"
                  >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text">Logout</span>
                </button>
          </>
        ) : (
          <>
            {/* <hr className='mx-6 border-t-1 border-buttonGray py-4'/> */}
            <div className="w-300 h-[355px] bg-mainGray rounded-2xl my-4 mx-[44px] flex flex-col justify-end p-14 gap-4">
              <h1 className='text-black text-5xl font-bold '>An all-in-one hub for class </h1>
              <h1 className='text-black text-5xl font-bold '>discussions and notes!</h1>
            </div>
            <div className='flex flex-row mx-[44px] gap-6 py-3 '>
              <Blocks text1="Participate in" text2="class forums"/>
              <Blocks text1="Share notes" text2="and resources"/>
              <Blocks text1="View previous" text2="class archives"/>
            </div>
           
           
          </>
          
        )}
      </div>
    );
  }


}