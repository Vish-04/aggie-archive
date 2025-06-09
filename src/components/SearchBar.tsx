'use client';
import { useState, useEffect, useRef } from "react";
import { Class } from "@/utils/types";

// initialize search bar props
type SearchBarProps = {
    onToggleClass: (course: Class) => void;
    isCurrent: (courseNum: string) => boolean;
};


// add toggling classes and archiving classes
export default function SearchBar({ onToggleClass, isCurrent }: SearchBarProps){
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [classes, setClasses] = useState<Class[]>([]);
    const [loading, setLoading] = useState(false);


    const wRef = useRef<HTMLDivElement>(null);


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


    // search for classes using searchbar and by connecting to database
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


    // list of classes
    return(
        <div ref={wRef} className="w-full my-4">
            <div className="flex items-center border border-[#AB97CC] rounded-[8px] px-4 py-3 bg-white" onClick={() => setIsOpen(true)}>
                {/*<img src="/search.png" alt="Search Icon" className="w-5 mr-3"></img>*/}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <path d="M29.4 31.5L19.95 22.05C19.2 22.65 18.3375 23.125 17.3625 23.475C16.3875 23.825 15.35 24 14.25 24C11.525 24 9.219 23.056 7.332 21.168C5.445 19.28 4.501 16.974 4.5 14.25C4.499 11.526 5.443 9.22 7.332 7.332C9.221 5.444 11.527 4.5 14.25 4.5C16.973 4.5 19.2795 5.444 21.1695 7.332C23.0595 9.22 24.003 11.526 24 14.25C24 15.35 23.825 16.3875 23.475 17.3625C23.125 18.3375 22.65 19.2 22.05 19.95L31.5 29.4L29.4 31.5ZM14.25 21C16.125 21 17.719 20.344 19.032 19.032C20.345 17.72 21.001 16.126 21 14.25C20.999 12.374 20.343 10.7805 19.032 9.4695C17.721 8.1585 16.127 7.502 14.25 7.5C12.373 7.498 10.7795 8.1545 9.4695 9.4695C8.1595 10.7845 7.503 12.378 7.5 14.25C7.497 16.122 8.1535 17.716 9.4695 19.032C10.7855 20.348 12.379 21.004 14.25 21Z" fill="#483183"/>
                </svg>
                <input
                    type="text"
                    placeholder="Search for classes..."
                    className="flex-grow outline-none bg-transparent text-black placeholder-[#AB97CC] px-4 text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />
            </div>

            {isOpen && (
                <div className="absolute left-24 border-t-0 right-24 bg-white border border-purpleBorderGray rounded-b-lg shadow-md z-10 p-6 max-h-[468px] overflow-y-auto w-1152px">
                    {loading && <p className="text-gray-600">Loading...</p>}
                    {!loading && classes.length === 0 && <p className="text-black">No courses found.</p>}
                    {!loading &&
                        classes.map((crs) => (
                        <div key={crs.id} className="py-1 p-[30px] mb-4 rounded-b-[10px] border-[#B0B0B0] rounded-t-[10px] w-full h-[109px] last:border-none bg-purpleGray shadow-md">
                            {/* class name + checkbox svg*/}
                            <div className="flex justify-between mb-1 items-center">
                                <p className="mt-[15px] text-[24px] font-bold text-darkPurple">
                                {crs.course_code}
                                </p>
                                {/* checkmark button */}
                                <button className="cursor-pointer" onClick={() => {onToggleClass(crs)}}>
                                    {isCurrent(crs.course_code) ? (
                                    <div className="flex items-center gap-2">
                                        <span className="mt-10">Added to <span className="text-brightPurple font-semibold">My Classes</span></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="mt-10">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5939 23.2579L12.5819 23.2599L12.5109 23.2949L12.4909 23.2989L12.4769 23.2949L12.4059 23.2589C12.3953 23.2563 12.3873 23.2583 12.3819 23.2649L12.3779 23.2749L12.3609 23.7029L12.3659 23.7229L12.3759 23.7359L12.4799 23.8099L12.4949 23.8139L12.5069 23.8099L12.6109 23.7359L12.6229 23.7199L12.6269 23.7029L12.6099 23.2759C12.6073 23.2653 12.6019 23.2593 12.5939 23.2579ZM12.8579 23.1449L12.8439 23.1469L12.6599 23.2399L12.6499 23.2499L12.6469 23.2609L12.6649 23.6909L12.6699 23.7029L12.6779 23.7109L12.8789 23.8029C12.8916 23.8063 12.9013 23.8036 12.9079 23.7949L12.9119 23.7809L12.8779 23.1669C12.8746 23.1543 12.8679 23.1469 12.8579 23.1449ZM12.1429 23.1469C12.1385 23.1443 12.1333 23.1434 12.1282 23.1445C12.1232 23.1456 12.1188 23.1487 12.1159 23.1529L12.1099 23.1669L12.0759 23.7809C12.0766 23.7929 12.0823 23.8009 12.0929 23.8049L12.1079 23.8029L12.3089 23.7099L12.3189 23.7019L12.3219 23.6909L12.3399 23.2609L12.3369 23.2489L12.3269 23.2389L12.1429 23.1469Z" fill="#483183"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5ZM5 5H19V19H5V5ZM16.95 9.795C17.0455 9.70275 17.1217 9.59241 17.1741 9.4704C17.2265 9.3484 17.2541 9.21718 17.2553 9.0844C17.2564 8.95162 17.2311 8.81994 17.1808 8.69705C17.1305 8.57415 17.0563 8.4625 16.9624 8.3686C16.8685 8.27471 16.7568 8.20046 16.634 8.15018C16.5111 8.0999 16.3794 8.0746 16.2466 8.07575C16.1138 8.0769 15.9826 8.10449 15.8606 8.1569C15.7386 8.20931 15.6282 8.28549 15.536 8.381L10.586 13.331L8.465 11.21C8.37216 11.1171 8.26192 11.0434 8.14059 10.9931C8.01926 10.9428 7.8892 10.9168 7.75785 10.9168C7.49258 10.9167 7.23814 11.022 7.0505 11.2095C6.86286 11.397 6.75739 11.6514 6.7573 11.9166C6.7572 12.1819 6.86249 12.4364 7.05 12.624L9.808 15.382C9.91015 15.4842 10.0314 15.5653 10.1649 15.6206C10.2984 15.6759 10.4415 15.7044 10.586 15.7044C10.7305 15.7044 10.8736 15.6759 11.0071 15.6206C11.1406 15.5653 11.2618 15.4842 11.364 15.382L16.95 9.795Z" fill="#483183"/>
                                        </svg>
                                    </div>
                                    ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" className="mt-10">
                                        <path d="M19.5 20.625H4.5C4.20163 20.625 3.91548 20.5065 3.7045 20.2955C3.49353 20.0845 3.375 19.7984 3.375 19.5V4.5C3.375 3.8775 3.8775 3.375 4.5 3.375H19.5C20.121 3.375 20.625 3.8775 20.625 4.5V19.5C20.625 19.7984 20.5065 20.0845 20.2955 20.2955C20.0845 20.5065 19.7984 20.625 19.5 20.625ZM5.625 18.375H18.375V5.625H5.625V18.375Z" fill="#483183"/>
                                    </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-[16px] font-[400] mt-[-10px] text-darkPurple">
                            {crs.title}
                            </p>
                        </div>
                        ))}
                </div>
            )}
        </div>
    );
}