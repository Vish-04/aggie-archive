/* initialize types for classes */
type ClassCardProps = {
    courseNumber: string;
    courseName: string;
};

export default function ClassCard({ courseNumber, courseName }: ClassCardProps){
    return(
        <div className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-end h-64 w-80">
            <img></img>
            <h2 className="text-lg font-semibold mb-1 text-black">{courseNumber}</h2>
            <p className="text-sm text-black">{courseName}</p>
        </div>
    );
}