'use client';
import { useState, useEffect, useRef } from "react";

// initialize search bar props
type SearchBarProps = {
    onToggleClass: (course: any) => void;
    onToggleArchive: (course: any) => void;
};


// add toggling classes and archiving classes
export default function SearchBar({ onToggleClass, onToggleArchive }: SearchBarProps){
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);


    const wRef = useRef<HTMLDivElement>(null);

    // logic for adding classes to dashboard
    const [checkedClasses, setCheckedClasses] = useState<Set<number>>(new Set());

    const toggleCheck = (crs: number) => {
        setCheckedClasses(prev => {
            const modSet = new Set(prev);
            if (!modSet.has(crs)) {
                modSet.add(crs);
            }
            else {
                modSet.delete(crs);
            }
            return modSet;
        })
    }

    // logic for archiving classes
    const [archivedClasses, setArchivedClasses] = useState<Set<number>>(new Set());

    const toggleArchived = (crs: number) => {
        setArchivedClasses(prev => {
            const modSet = new Set(prev);
            if (!modSet.has(crs)) {
                console.log("archived class")
                modSet.add(crs);
            }
            else {
                console.log("unarchived class")
                modSet.delete(crs);
            }
            return modSet;
        })
    }


    // logic for exiting out of classes if you click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wRef.current && !wRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


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
        <div ref={wRef} className="w-full my-4">
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
                        <div key={crs.id} className="py-1 p-[30px] mb-4 rounded-b-[10px] border-[#B0B0B0] rounded-t-[10px] w-[1062px] h-[109px] last:border-none bg-[#F5F6FB]">
                            {/* class name + checkbox svg*/}
                            <div className="flex justify-between mb-1 items-center">
                                <p className="mt-[15px] font-semibold text-[24px] font-bold">
                                {crs.course_code}
                                </p>
                                {/* checkmark button */}
                                <button className="cursor-pointer" onClick={() => {toggleCheck(crs.id); onToggleClass(crs);}}>
                                    {checkedClasses.has(crs.id) ? (
                                    <div className="flex items-center gap-2">
                                        <span className="mt-8">Added to <strong>My Classes</strong></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="mt-8">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4.5C6.70435 4.5 5.94129 4.81607 5.37868 5.37868C4.81607 5.94129 4.5 6.70435 4.5 7.5V28.5C4.5 29.2956 4.81607 30.0587 5.37868 30.6213C5.94129 31.1839 6.70435 31.5 7.5 31.5H28.5C29.2956 31.5 30.0587 31.1839 30.6213 30.6213C31.1839 30.0587 31.5 29.2956 31.5 28.5V7.5C31.5 6.70435 31.1839 5.94129 30.6213 5.37868C30.0587 4.81607 29.2956 4.5 28.5 4.5H7.5ZM7.5 7.5H28.5V28.5H7.5V7.5ZM25.425 14.6925C25.5683 14.5541 25.6825 14.3886 25.7612 14.2056C25.8398 14.0226 25.8811 13.8258 25.8829 13.6266C25.8846 13.4274 25.8467 13.2299 25.7712 13.0456C25.6958 12.8612 25.5844 12.6937 25.4436 12.5529C25.3028 12.4121 25.1353 12.3007 24.9509 12.2253C24.7666 12.1498 24.5691 12.1119 24.3699 12.1136C24.1707 12.1154 23.9739 12.1567 23.7909 12.2353C23.6079 12.314 23.4424 12.4282 23.304 12.5715L15.879 19.9965L12.6975 16.815C12.5582 16.6756 12.3929 16.5651 12.2109 16.4896C12.0289 16.4141 11.8338 16.3753 11.6368 16.3752C11.2389 16.3751 10.8572 16.533 10.5757 16.8143C10.2943 17.0955 10.1361 17.4771 10.1359 17.875C10.1358 18.2729 10.2937 18.6545 10.575 18.936L14.712 23.073C14.8652 23.2263 15.0472 23.3479 15.2474 23.4309C15.4476 23.5138 15.6623 23.5565 15.879 23.5565C16.0957 23.5565 16.3104 23.5138 16.5106 23.4309C16.7108 23.3479 16.8928 23.2263 17.046 23.073L25.425 14.6925Z" fill="black"/>
                                        </svg>
                                    </div>
                                    ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="mt-8" >
                                        <path d="M29.25 30.9375H6.75C6.30245 30.9375 5.87322 30.7597 5.55676 30.4432C5.24029 30.1268 5.0625 29.6976 5.0625 29.25V6.75C5.0625 5.81625 5.81625 5.0625 6.75 5.0625H29.25C30.1815 5.0625 30.9375 5.81625 30.9375 6.75V29.25C30.9375 29.6976 30.7597 30.1268 30.4432 30.4432C30.1268 30.7597 29.6976 30.9375 29.25 30.9375ZM8.4375 27.5625H27.5625V8.4375H8.4375V27.5625Z" fill="black"/>
                                    </svg>
                                    )}
                                </button>
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