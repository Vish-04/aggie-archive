/* initialize types for classes */
type ClassCardProps = {
    courseNumber: string;
    courseName: string;
};

export default function ClassCard({ courseNumber, courseName }: ClassCardProps){
    return(
        <div className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-end h-[263px] w-[278px]">
            <img src="/white.jpg" alt="placeholder image" className="rounded-lg mb-3"></img>
            <h2 className="text-[20px] font-semibold text-black">{courseNumber}</h2>
            <p className="text-[12px] text-black">{courseName} | UC Davis</p>
        </div>
    );
}