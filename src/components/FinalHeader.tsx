'use client';
import {useUser} from '@auth0/nextjs-auth0/client';
import {LogOut} from 'lucide-react';
import {useState, useRef, useEffect} from 'react';
import Image from 'next/image'

export default function Header() {
	const {user, isLoading} = useUser();
	const [logout, setLogout] = useState(false);
	const logoutRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
				setLogout(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);


	return (
		<div>
			<div className="flex justify-between items-center pb-3 pt-6 px-10">
				<Image
					src="/logo.svg"
					width={160}
					height={50}
					alt="Noteorbit logo"
					onClick={() => {
						window.location.href = '/dashboard';
					}}
				/>

				{/*User not logged in*/}
				{!isLoading && !user &&
					<div className="text-right flex gap-3">
						<button
							className=" rounded-lg px-4 py-1"
							onClick={() => {
								window.location.href = '/api/auth/login';
							}}
						>
							<span className="text-darkPurple font-medium">Sign up</span>
						</button>

						<button
							className="bg-brightPurple rounded-lg font-medium px-6 py-2"
							onClick={() => {
								window.location.href = '/api/auth/login';
							}}
						>
							<span className="text-white">Log in</span>
						</button>
					</div>
				}

				{/*User is logged in*/}
				{!isLoading && user &&
					<div>
						<div className="flex flex-row py-2 justify-between items-center">
							<div className="text-right flex" ref={logoutRef}>
								<button className="flex items-center gap-3" onClick={() => setLogout(!logout)}>
									<span className="text-base font-bold text-darkPurple">{user.name} </span>
									<Image
										src="/profile.svg"
										alt="Profile Image"
										width={40}
										height={40}
									/>
								</button>
								{logout && (
									<div
										className="absolute right-12 mt-12 w-52 bg-white border border-gray-200 rounded-md shadow-sm ">
										<button
											onClick={() => {
												window.location.href = '/api/auth/logout';
											}}
											className="flex items-center gap-2 px-3 py-2 w-full text-black font-bold">
											< LogOut onClick={() => {
												window.location.href = '/api/auth/logout'
											}}/> Sign Out
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				}
			</div>
			<hr className='mx-10 border-t-1 border-buttonGray '/>
		</div>

	)
}