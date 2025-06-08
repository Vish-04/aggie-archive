'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const { user, isLoading } = useUser();
    const [logout, setLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
        setLogout(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


    return (
      <div>
         <div className="flex justify-between items-center py-3 px-10">
      {/* <h1 className="text-black text-left text-2xl font-bold">noteorbit</h1> */}
            <img src="/logo.svg" alt="" className='cursor-pointer' onClick={() => { window.location.href = '/dashboard'; }} />

      { !isLoading && !user && 
        
          <div className="text-right flex gap-3">
            <button
              onClick={() => { window.location.href = '/api/auth/login'; }}
              className=" rounded-lg px-4 py-1"
            >
              <span className="text-black">Sign Up</span>
            </button>
            <button
              onClick={() => { window.location.href = '/api/auth/login'; }}
              className="bg-[#483183] rounded-lg font-base px-6 py-1"
            >
              <span className="text-white">Login</span>
            </button>
          </div>
      }

      {!isLoading && user &&
      <div>
        <div className="flex flex-row pt-6 py-2">

        <div className="text-right flex" ref={logoutRef}>
          <button className='flex flex row gap-4' onClick={() => setLogout(!logout)}>
            <span className="text-black text-base mt-2 font-bold text-darkPurple">{user.name} </span>
             <img src="/profile.svg" alt="" />
          </button>
          {logout && (
             <div className="absolute right-12 mt-12 w-52 bg-white border border-gray-200 rounded-md shadow-sm ">
                <button
                  onClick={() => { window.location.href = '/api/auth/logout'; }} 
                  className="flex items-center gap-2 px-3 py-2 w-full text-black font-bold"> 
                  < LogOut onClick={()=>{
                    window.location.href = '/api/auth/logout'
                  }} /> Sign Out     
               </button>
            </div>
            
          )}

        </div>
      </div>
    

    </div>
      }
     
    </div>
      <hr className='mx-10 border-t-1 border-buttonGray '/>

      </div>
   
  )
}