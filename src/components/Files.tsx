import { Document } from "@/utils/types";

export default function Files({ document }: { document: Document }) {
  return (
    <button 
      className="rounded bg-white w-[192px] h-[255px] shadow-md"
      onClick={() => {
        window.open(document.aws_url, '_blank');
      }}
    >
      <img src={document.aws_url} alt={document.name} />
      <p>{document.name}</p>
    </button>
  );
}