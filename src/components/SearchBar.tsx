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
                <div className="absolute left-24 border-t-0 right-10 bg-white border border-[#B0B0B0] rounded-md shadow-md z-10 p-6 max-h-[468px] overflow-y-auto">
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {!loading && classes.length === 0 && <p className="text-black">No courses found.</p>}
                    {!loading &&
                        classes.map((crs) => (
                        <div
                            key={crs.id}
                            className="py-1 p-[30px] mb-4 rounded-b-[10px] border-[#B0B0B0] rounded-t-[10px] w-[1062px] h-[109px] last:border-none cursor-pointer bg-[#F5F6FB]"
                        >
                            <p className="mt-[20px] font-semibold text-[24px] font-[700]">
                            {crs.course_code}
                            </p>
                            <p className="text-black text-[16px] font-[400] ">
                            {crs.title}
                            </p>
                            <p className="text-sm text-gray-500">{crs.description}</p>
                        </div>
                        ))}
                </div>
            )}
        </div>
    );
}