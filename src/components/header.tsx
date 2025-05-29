'use client';

export default function Header() {
    return (
        <div className="flex justify-between items-center py-6 px-10">
        <h1 className="text-black text-left text-2xl font-bold">noteorbit</h1>
        <div className="text-right flex gap-3">
            <button
            onClick={() => { window.location.href = '/api/auth/login'; }}
            className="bg-buttonGray rounded-lg px-4 py-1"
            >
            <span className="text-black">Sign Up</span>
            </button>
            <button
            onClick={() => { window.location.href = '/api/auth/login'; }}
            className="bg-buttonGray rounded-lg font-base px-6 py-1"
            >
            <span className="text-black">Login</span>
            </button>
        </div>
        </div>
    )
    }