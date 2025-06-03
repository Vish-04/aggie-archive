'use client';
import { useState, useEffect } from "react";

export default function SearchBar(){
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) {
            setClasses([]);
            return;
        }

        console.log("query: ", query);

        setLoading(true);
        fetch(`/api/fetch/class/courses?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched classes:", data);
            setClasses(data || []);
            setLoading(false);
        })
        .catch(() => {
            setClasses([]);
            setLoading(false);
        });
    }, [query]);


    return(
        <div className="w-full my-4" onBlur={() => setIsOpen(false)}>
            <div className="flex items-center border border-gray-300 rounded-[8px] px-3 py-2 bg-white" onClick={() => setIsOpen(true)}>
                <img src="/search.png" alt="Search Icon" className="w-5 mr-3"></img>
                <input
                    type="text"
                    placeholder="Search for classes..."
                    className="flex-grow outline-none bg-transparent text-black placeholder-gray-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />
            </div>

            {isOpen && (
                <div className="absolute left-24 border-t-0 right-12 bg-white border border-[#B0B0B0] rounded-md shadow-md z-10 p-6 max-h-[468px] overflow-y-auto">
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {!loading && classes.length === 0 && <p className="text-black">No courses found.</p>}
                    {!loading &&
                        classes.map((crs) => (
                        <div key={crs.id} className="py-1 p-[30px] mb-4 rounded-b-[10px] border-[#B0B0B0] rounded-t-[10px] w-[1062px] h-[109px] last:border-none cursor-pointer bg-[#F5F6FB]">
                            {/* class name + checkbox svg*/}
                            <div className="flex justify-between mb-1 items-center">
                                <p className="mt-[15px] font-semibold text-[24px] font-bold">
                                {crs.course_code}
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="mt-8" >
                                    <path d="M29.25 30.9375H6.75C6.30245 30.9375 5.87322 30.7597 5.55676 30.4432C5.24029 30.1268 5.0625 29.6976 5.0625 29.25V6.75C5.0625 5.81625 5.81625 5.0625 6.75 5.0625H29.25C30.1815 5.0625 30.9375 5.81625 30.9375 6.75V29.25C30.9375 29.6976 30.7597 30.1268 30.4432 30.4432C30.1268 30.7597 29.6976 30.9375 29.25 30.9375ZM8.4375 27.5625H27.5625V8.4375H8.4375V27.5625Z" fill="black"/>
                                </svg>
                            </div>
                            <p className="text-black text-[16px] font-[400] mt-[-14px] ">
                            {crs.title}
                            </p>
                            <p className="text-sm text-gray-500">{crs.description} <span className="ml-4"></span></p>
                        </div>
                        ))}
                </div>
            )}
        </div>
    );
}