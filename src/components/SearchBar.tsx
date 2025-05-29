export default function SearchBar(){
    return(
        <div className="w-full my-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                <img src="/search.png" alt="Search Icon" className="w-5 mr-3"></img>
                <input
                    type="text"
                    placeholder="Search for classes..."
                    className="flex-grow outline-none bg-transparent text-black placeholder-gray-500"
                />
            </div>
        </div>
    );
}