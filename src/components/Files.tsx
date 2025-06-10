import { Document } from "@/utils/types";

export default function Files({ document }: { document: Document }) {
  return (
    <button 
      className="rounded bg-white sm:w-[192px] sm:h-[255px] w-[120px] h-[176px] shadow-md"
      onClick={() => {
        window.open(document.aws_url, '_blank');
      }}
    >
      <img src="/notes.png" alt={document.name} />
      <p className='text-darkPurple pt-8 sm:pt-4'>{document.name}</p>
    </button>
  );
}