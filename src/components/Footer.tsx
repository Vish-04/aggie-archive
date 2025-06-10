import Image from 'next/image'

export default function Footer() {
	return (
		<div className="px-16 py-10">
			<div className="flex justify-between items-center">
				<Image
					src="/logo.svg"
					width={160}
					height={50}
					alt="Noteorbit logo"
				/>
				<h2 className="text-base text-darkPurple font-bold mt-4"> Created by</h2>
			</div>

			<div className="flex justify-between items-center">
				<p className="text-darkPurple text[15px]">@ Spring Quarter 2025 | ECS 162</p>
				<p className="text-darkPurple text[15px]">
					Yujin Cho • Mileyna Soo • Ananya Ratakonda • Vibha Chandrasekar • Anna Cai • Vishwa Akkati
				</p>
			</div>
		</div>
	)
		;
}