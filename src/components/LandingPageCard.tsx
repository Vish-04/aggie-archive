import {ReactNode} from "react";

export default function LandingPageCard({children, className=""}: {children: ReactNode, className: string}) {
	return (
		<div className={`flex flex-row justify-center items-center ${className}`}>
			<div
				className="flex flex-col justify-center items-center text-center shadow-md w-[320px] md:w-[350px] h-[340px] bg-gradient-to-tr from-lightGradientOrange from-10% via-lightGradientPink via-20% to-lightGradientBlue rounded-3xl">
				{children}
			</div>
		</div>
	)
}