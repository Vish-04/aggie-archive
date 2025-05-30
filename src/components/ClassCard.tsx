/* initialize types for classes */
type ClassCardProps = {
    courseNumber: string;
    courseName: string;
};

export default function ClassCard({ courseNumber, courseName }: ClassCardProps){
    return(
        <div className="bg-gray-200 rounded-[10px] shadow-md p-4 flex flex-col justify-end h-[263px] w-[278px]">
            <img src="/white.jpg" alt="placeholder image" className="rounded-[10px] bg-white mb-3 w-[263px] h-[174px]"></img>
            <h2 className="text-[20px] font-bold text-black">{courseNumber}</h2>
            <p className="text-[12px] font-normal text-black">{courseName} | UC Davis</p>
        </div>
    );
}