import {Document} from "@/utils/types";

export default function Files({document}: { document: Document }) {
	return (
		<div className="flex flex-col gap-3 justify-center items-center h-fit">
			<button
				className="rounded bg-white w-[192px] h-[255px] shadow-md"
				onClick={() => {
					window.open(document.aws_url, '_blank');
				}}
			>
				<img src="/notes-placeholder.svg" alt={document.name}/>
			</button>
			<p className="text-darkPurple">{document.name}</p>
		</div>
	);
}