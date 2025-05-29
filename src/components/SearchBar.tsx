'use client';
import { useState } from "react";

export default function SearchBar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="w-full my-4" onBlur={() => setIsOpen(false)}>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white" onClick={() => setIsOpen(true)}>
                <img src="/search.png" alt="Search Icon" className="w-5 mr-3"></img>
                <input
                    type="text"
                    placeholder="Search for classes..."
                    className="flex-grow outline-none bg-transparent text-black placeholder-gray-500"
                />
            </div>

            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10 p-4">
                <p className="text-gray-600">Classes are here</p>
                </div>
            )}
        </div>
    );
}