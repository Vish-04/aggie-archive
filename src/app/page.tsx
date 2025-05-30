'use client';

// React Imports
import { useState } from 'react';

// Auth0 Imports
import { useUser } from '@auth0/nextjs-auth0/client';
import Footer from '@/components/Footer';



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
            <h1>Not logged in</h1>
              <button
                  onClick={() => {
                    window.location.href = '/api/auth/login';
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text"
                  >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text">Sign Up or Login</span>
                </button>
          </>
        )}
        <Footer></Footer>
      </div>
      
    );
  }
}
