'use client';

// Auth0 Imports
import {useUser} from '@auth0/nextjs-auth0/client';
import Blocks from '@/components/LandingPageBlocks'

import Image from 'next/image'
import LandingPageCard from "@/components/LandingPageCard";

export default function Home() {
	const {user, isLoading} = useUser()


	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20 font-medium text-darkPurple text-xl">
				Loading...
			</div>
		);
	} else {
		return (

			<div className="">
				{user ? (
					<>
						<h1>Hello {user?.name}</h1>
						<button
							onClick={() => {
								window.location.href = '/api/auth/logout';
							}}
							className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text"
						>
							<span
								className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text">Logout</span>
						</button>
					</>
				) : (
					<>
						<div className="relative flex flex-row gap-10 pt-20 pb-20 pl-16 justify-center ">
							<div className="flex gap-6 flex-col py-28">
								<h1 className='text-darkPurple text-5xl font-[500] leading-[1.25]'>
									An <span
									className="font-semibold bg-gradient-to-r from-brightPurple  to-gradientPink text-transparent bg-clip-text">all-in-one hub</span>
									<br/>
									for class discussions
									<br/>
									and notes
								</h1>
								<p className="text-pinkPurple text-2xl">See what your classmates are up to now!</p>
								<button className="bg-brightPurple px-7 py-2.5 mt-3 rounded-lg text-white text-xl w-fit">Get started
								</button>
							</div>

							<Image
								src="/landing-page-image.png"
								width={800}
								height={500}
								unoptimized={true}
								alt="Landing page graphic"
								className="object-contain hidden lg:block"
							/>
						</div>

						<div className="flex flex-col lg:flex-row gap-10 justify-center pb-20">
							<LandingPageCard className="lg:pt-24">
								<Image
									src="/landing-speech.svg"
									width={140}
									height={140}
									alt="Planet icon"
									className=""
								/>
								<h2 className=" text-darkPurple text-[28px] leading-[1.3]">
									Participate in
									<br/>
									<span
										className="font-[550] bg-gradient-to-r from-brightPurple  to-gradientPink text-transparent bg-clip-text">class forums</span>
								</h2>
								<p className="text-pinkPurple leading-[1.35] pt-4 pb-5">
									Each class has a dedicated
									<br/>
									<span className="text-brightPurple">discussion board</span> which can be used
									<br/>
									to discuss relevant course material.
								</p>
							</LandingPageCard>

							<LandingPageCard className="">
								<Image
									src="/landing-note.svg"
									width={140}
									height={140}
									alt="Planet icon"
									className=""
								/>
								<h2 className=" text-darkPurple text-[28px] leading-[1.3]">
									Share class
									<br/>
									<span
										className="font-[550] bg-gradient-to-r from-brightPurple  to-gradientPink text-transparent bg-clip-text">notes and resources</span>
								</h2>
								<p className="text-pinkPurple leading-[1.35] pt-4 pb-5">
									Class notes can be <span className="text-brightPurple">easily shared</span>
									<br/>
									<span className="text-brightPurple">and accessed</span> through each class
									<br/>
									page’s Notes tab.
								</p>
							</LandingPageCard>

							<LandingPageCard className="lg:pt-24">
								<Image
									src="/landing-people.svg"
									width={140}
									height={140}
									alt="Planet icon"
								/>
								<h2 className=" text-darkPurple text-[28px] leading-[1.3]">
									View previous
									<br/>
									<span
										className="font-[550] bg-gradient-to-r from-brightPurple  to-gradientPink text-transparent bg-clip-text">class archives</span>
								</h2>
								<p className="text-pinkPurple leading-[1.35] pt-4 pb-5">
									Each class page archives all <span className="text-brightPurple">class</span>
									<br/>
									<span className="text-brightPurple">material and discussions</span> from previous
									<br/>
									years—ensuring nothing gets lost!
								</p>
							</LandingPageCard>
						</div>
					</>
				)}
			</div>
		);
	}


}