'use client';
import React from "react";

/* initialize course type */
type Course = {
    id: string;
    course_code: string;
    title: string;
};

/* initialize props for classes */
type ClassCardProps = {
    course: Course;
    onToggleClass: (course: any) => void;
    onToggleArchive: (course: Course) => void;
    isArchived: (courseNum: string) => boolean;
};


export default function ClassCard({ course, onToggleClass, onToggleArchive, isArchived }: ClassCardProps){

    return(
    <div className="bg-[#EDEFFA] rounded-[10px] shadow-md p-4 flex flex-col justify-end h-[263px] w-[278px]">
        <img src="/white.jpg" alt="placeholder image" className="rounded-[10px] bg-white mb-3 w-[263px] h-[174px]"></img>
        {/* class name + archive button */}
        <h2 className="text-[20px] font-bold text-black flex items-center gap-[146px]">
            <span className="whitespace-nowrap">{course.course_code}</span>
            {/* if a current class, have archive button */}
            {!isArchived(course.course_code) && (
            <button className="pointer-cursor" onClick={() => { onToggleArchive(course); onToggleClass(course) }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18L16 14L14.6 12.6L13 14.2V10H11V14.2L9.4 12.6L8 14L12 18ZM5 8.00001V19H19V8.00001H5ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V6.52501C3 6.29167 3.03767 6.06667 3.113 5.85001C3.18833 5.63334 3.30067 5.43334 3.45 5.25001L4.7 3.72501C4.88333 3.49167 5.11233 3.31234 5.387 3.18701C5.66167 3.06167 5.94933 2.99934 6.25 3.00001H17.75C18.05 3.00001 18.3377 3.06267 18.613 3.18801C18.8883 3.31334 19.1173 3.49234 19.3 3.72501L20.55 5.25001C20.7 5.43334 20.8127 5.63334 20.888 5.85001C20.9633 6.06667 21.0007 6.29167 21 6.52501V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5.4 6.00001H18.6L17.75 5.00001H6.25L5.4 6.00001Z" fill="black"/>
                </svg>
            </button>
            )}
        </h2>
        <p className="text-[12px] font-normal text-black"><strong>UC Davis | </strong>{course.title}</p>
    </div>
    );
}