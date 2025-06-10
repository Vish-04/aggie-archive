import Image from 'next/image'

export default function Footer() {
	return (
		<div>
			<div className="block lg:hidden px-8 py-8 text-left">
				<Image
					src="/logo.svg"
					width={160}
					height={50}
					alt="Noteorbit logo"
				/>
				<p className="text-darkPurple text-[15px] ">@ Spring Quarter 2025 | ECS 162</p>
				<h2 className="text-base text-darkPurple font-bold mt-8">Created by</h2>
				<div className="mt-2 text-darkPurple text-[15px]">
					<p>Yujin Cho</p>
					<p>Mileyna Soo</p>
					<p>Ananya Ratakonda</p>
					<p>Vibha Chandrasekar</p>
					<p>Anna Cai</p>
					<p>Vishwa Akkati</p>
				</div>
			</div>

		<div className="hidden lg:block lg:px-16 lg:py-10 px-8">
			<div className="flex lg:justify-between lg:items-center">
				<Image
					src="/logo.svg"
					width={160}
					height={50}
					alt="Noteorbit logo"
				/>
				<h2 className="text-base text-darkPurple font-bold mt-4"> Created by</h2>
			</div>

			<div className="flex lg:justify-between lg:items-center">
				<p className="text-darkPurple text[15px]">@ Spring Quarter 2025 | ECS 162</p>
				<p className="text-darkPurple text[15px]">
					Yujin Cho • Mileyna Soo • Ananya Ratakonda • Vibha Chandrasekar • Anna Cai • Vishwa Akkati
				</p>
			</div>
		</div>
		</div>
		
	);
}