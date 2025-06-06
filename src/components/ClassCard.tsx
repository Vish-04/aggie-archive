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
        <img src="/classCardPhoto.png" alt="placeholder image" className="rounded-[10px] bg-white mb-3 w-[263px] h-[174px]"></img>
        {/* class name + archive button */}
        <h2 className="text-[20px] font-bold text-black flex items-center gap-[146px]">
            <span className="whitespace-nowrap">{course.course_code}</span>
            {/* if a current class, have archive button */}
            {!isArchived(course.course_code) && (
            <button className="pointer-cursor" onClick={() => { onToggleArchive(course); onToggleClass(course) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.24902 3.5H17.75C17.9208 3.5 18.0855 3.52643 18.2461 3.58008L18.4062 3.64355C18.5593 3.71329 18.6902 3.80329 18.8018 3.91504L18.9062 4.03418L18.9131 4.04199L20.1631 5.56738V5.56641C20.2772 5.70584 20.3606 5.85521 20.416 6.01465C20.4583 6.13632 20.4847 6.26163 20.4951 6.3916L20.5 6.52344V19C20.5 19.4163 20.3579 19.7606 20.0596 20.0596C19.7988 20.3208 19.5025 20.4622 19.1533 20.4932L19.001 20.5H5C4.58354 20.5 4.23963 20.3578 3.94141 20.0596C3.68039 19.7986 3.53854 19.5021 3.50684 19.1523L3.5 18.999V6.52539C3.5 6.3916 3.51591 6.26244 3.54785 6.1377L3.58496 6.01465C3.64039 5.85522 3.72278 5.7056 3.83594 5.56641L3.83691 5.56738L5.08691 4.04199L5.09277 4.03418C5.1926 3.90713 5.31084 3.80234 5.44922 3.71875L5.59473 3.6416C5.75183 3.56995 5.91301 3.52619 6.08008 3.50879L6.24902 3.5ZM4.5 19.5H19.5V7.5H4.5V19.5ZM12.5 10.5V15.4072L13.3535 14.5537L14.5996 13.3066L15.293 14L12 17.293L8.70703 14L9.39941 13.3066L11.5 15.4072V10.5H12.5ZM5.86914 4.67578L5.01855 5.67578L4.31836 6.5H19.6816L18.9814 5.67578L18.1309 4.67578L17.9814 4.5H6.01855L5.86914 4.67578Z" fill="black" stroke="#483183"/>
                </svg>
            </button>
            )}
        </h2>
        <p className="text-[12px] font-normal text-black"><strong>UC Davis | </strong>{course.title}</p>
    </div>
    );
}