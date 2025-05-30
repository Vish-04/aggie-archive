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
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#B0B0B0] rounded-md shadow-md z-10 p-4">
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {!loading && classes.length === 0 && <p className="text-gray-600">No courses found.</p>}
                    {!loading &&
                        classes.map((crs) => (
                        <div
                            key={crs.id}
                            className="py-1 border-b last:border-none cursor-pointer hover:bg-gray-100"
                        >
                            <p className="font-semibold">
                            {crs.course_code} - {crs.title}
                            </p>
                            <p className="text-sm text-gray-500">{crs.description}</p>
                        </div>
                        ))}
                </div>
            )}
        </div>
    );
}