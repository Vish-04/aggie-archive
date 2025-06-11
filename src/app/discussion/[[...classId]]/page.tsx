'use client';

import React, { useState, useEffect } from 'react'
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import { Class, Thread, User } from '@/utils/types';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchClass, fetchThreads, fetchUser, fetchPosts, updateUser } from '@/utils/db';
import { useParams, useRouter } from 'next/navigation';
import InvalidPage from '@/components/InvalidPage';


const Page = () => {
	const router = useRouter();
	const [currClasses, setCurrClasses] = useState<Class[]>([]);
	const [userData, setUserData] = useState<User | null>(null);
	const { isLoading, user } = useUser();

	const [loading, setLoading] = useState(true);
	const [showCreateThread, setShowCreateThread] = useState(false);
	const [activeThread, setActiveThread] = useState<Thread | null>(null);
	const [showThreadsList, setShowThreadsList] = useState(true);
	const [openThread, setOpenThread] = useState<boolean>(false);
	const [threads, setThreads] = useState<Thread[]>([]);

	const params = useParams();
	const classId = params.classId?.[0] || 'No Class ID';
	const isClassInDashboard = userData?.classes.includes(classId);
	const [classData, setClassData] = useState<Class | null>(null);
	const [invalidClass, setInvalidClass] = useState(false);
	const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
	const [showDropdownMenu, setShowDropdownMenu] = useState(false);


  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/api/auth/login';
    }
  }, [isLoading, user]);

	const handleAddToDashboard = async () => {
		if (classData && userData) {
			const updated = [...currClasses, classData];
			setCurrClasses(updated);
			const classIds = updated.map(cls => cls.id);

			try {
				await updateUser(userData.email, { classes: classIds });
				setUserData(prev => prev ? { ...prev, classes: classIds } : null);
			} catch (err) {
				console.error('Failed to add class to dashboard:', err);
			}
		}
	};

	const handleRemoveFromDashboard = async () => {
		if (userData) {
			const updatedClassIds = userData.classes.filter(id => id !== classId);

			setCurrClasses(prev => prev.filter(c => c.id !== classId));

			const updatedUserData = { classes: updatedClassIds };
			setUserData(prev => prev ? { ...prev, ...updatedUserData } : null);

			try {
				await updateUser(userData.email, updatedUserData);
			} catch (error) {
				console.error('Failed to update user:', error);
			}
		}
	};
	const getClassAndUser = async () => {
		const classRes = await fetchClass(classId);
		if ('message' in classRes) {
			setInvalidClass(true);
			setLoading(false);
			return;
		}

		setClassData(classRes);

		if (user) {
			const userRes = await fetchUser(user.email!);
			if ('message' in userRes) {
				window.location.href = '/api/auth/login';
				return;
			}

			setUserData(userRes);

			const fetchedClasses: Class[] = [];

			await Promise.all(
				userRes.classes.map(async (crsId: string) => {
					const cls = await fetchClass(crsId);
					if (!('message' in cls)) fetchedClasses.push(cls);
				})
			);

			setCurrClasses(fetchedClasses);
		}
		setLoading(false);
	};
	useEffect(() => {
		getClassAndUser();
	}, [user, classId]);


	async function getThreadsAndCommentCount() {
		try {
			const res = await fetchThreads(classId);
			if ('message' in res) {
				setThreads([]);
				setCommentCounts({});
			} else {
				setThreads(res);

				// Fetch comment counts for each thread
				const counts: Record<string, number> = {};
				await Promise.all(
					res.map(async (thread: Thread) => {
						const posts = await fetchPosts(thread.id);
						counts[thread.id] = posts.length;
					})
				);
				setCommentCounts(counts);
			}
		} catch (error) {
			console.error("Error", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getThreadsAndCommentCount();
	}, [classId]);

	const toggleDropdown = () => {
		setShowDropdownMenu(!showDropdownMenu);
	};

	const handleOpenForm = () => {
		setShowCreateThread(true);
		setShowThreadsList(false);
		setShowDropdownMenu(false);
	};
	
	const handleCloseForm = () => {
		setShowCreateThread(false);
		setShowThreadsList(true);
	};

	const openActiveThread = (newThread: Thread) => {
		setShowThreadsList(false);
		setShowCreateThread(false);
		setActiveThread(newThread);
		setOpenThread(true);
		getThreadsAndCommentCount();
		setShowDropdownMenu(false);
	}

	if (isLoading) {
		return (
		  <div className="flex justify-center items-center py-20 font-medium text-darkPurple text-xl">
			Loading...
		  </div>
		);
	  }
	
	  if (!user) {
		return (
		  <div className="flex justify-center items-center py-20 font-medium text-darkPurple text-xl">
			Loading...
		  </div>
		);
	  }
	  
	if (invalidClass) {
		return <InvalidPage />;
	}


	return (

		<div>
			<div className="px-6 md:px-12 lg:px-16 pt-6 md:pt-8">
				<div className="flex justify-between pt-4 pb-6 md:pb-8 md:py-8 lg:pb-10 lg:pt-10">
					<div className="flex gap-[28px] items-center">
						{/* Course code (i.e., ECS162) */}
						<h1 className="text-3xl md:text-[40px] font-bold">{classData?.course_code}</h1>
						{/* Add to dashboard button */}
						<div className="hidden md:inline">
							{!isClassInDashboard ?
								(
									<button
										type="button"
										className="bg-[#8347E7] font-[400] text-white text-[16px] rounded w-[178px] h-[36px]"
										onClick={handleAddToDashboard}
									>
										+ Add to Dashboard
									</button>
								) : (
									<button
										type="button"
										className="bg-purple font-[400] text-[#483183] text-[16px] rounded w-[226px] h-[36px] border border-[#8347E7]"
										onClick={handleRemoveFromDashboard}
									>
										- Remove from Dashboard
									</button>
								)
							}
						</div>
						{/* drop down menu */}
						<div className="md:hidden z-40">
							<img onClick={toggleDropdown} src="/arrow.svg" alt="arrow icon" style={{transform: showDropdownMenu ? 'rotate(180deg)' : 'rotate(0deg)'}}></img>
							{showDropdownMenu ? (<div className="absolute left-[22px] mt-[5px] flex flex-col gap-[1px]">
								{!isClassInDashboard ?
									(
										<button
											type="button"
											className="bg-[#8347E7] font-[400] text-white text-[12px] rounded w-[149px] h-[32px]"
											onClick={handleAddToDashboard}
										>
											+ Add
										</button>
									) : (
										<button
											type="button"
											className="bg-[#F6F3FF] font-[400] text-[#483183] text-[12px] rounded w-[149px] h-[32px] border border-[#8347E7]"
											onClick={handleRemoveFromDashboard}
										>
											- Remove
										</button>
									)
								}
								<button type="button"
									className="bg-[#8347E7] font-[400] text-white text-[12px] rounded w-[149px] h-[32px]"
									onClick={handleOpenForm}>
										+ Thread
								</button>
							</div>) : (<div className="hidden"></div>)}
						</div>
					</div>
					{/* "Discussion" and "Notes" toggle */}
					<div className="flex justify-center items-center">
						<div className="bg-[#ECEEF8] text-[#483183] font-medium p-1 rounded-md md:rounded-[8px]">
							<button type="submit" className="bg-white text-[16px] md:text-[18px] rounded px-4 py-2 md:px-6 md:py-2"
											onClick={() => router.push(`/discussion/${classId}`)}>Discussion
							</button>
							<button type="submit" className="text-[16px] md:text-[18px] rounded h-[39px] px-4 py-2 md:px-6 md:py-2"
											onClick={() => router.push(`/notes/${classId}`)}>Notes
							</button>
						</div>
					</div>
				</div>
				{/* Display Back to Discussion button*/}
				{(openThread || showCreateThread) && (
					<button type="submit"
									className="bg-[#ECEEF8] flex items-center gap-2 text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] h-[36px] px-3 py-1"
									onClick={() => {
										setOpenThread(false)
										setShowThreadsList(true);
										setShowCreateThread(false);
										setActiveThread(null);
									}}><img src="/arrow_back.svg" className="h-[15px]" alt="back icon" ></img>Back to Discussion</button>
				)}

				<div className={`rounded-lg ${showThreadsList ? '' : 'hidden'}`}>
					<button type="button" onClick={handleOpenForm}
									className="hidden md:inline bg-purple text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] h-[36px] w-[154px]">+
						Create thread
					</button>
					{/* temporary loading message */}
					{loading && (
						<p className="py-16">Loading threads...</p>
					)}
					<div className="flex flex-col gap-2 md:gap-[17px] pt-4 md:pt-8 ">
						{threads.map(thread => (
							<div key={thread.id} onClick={() => openActiveThread(thread)}
								className="role=button px-5 py-2 md:px-8 md:py-5 bg-white border border-[#CCCCFF] rounded-[10px] cursor-pointer">

								<Comment
									commentCount={commentCounts[thread.id] ?? 0}
									type="preview"
									user_email={thread.user_email}
									title={thread.name}
									content={thread.content}
								/>

							</div>
						))}
					</div>
				</div>


				{showCreateThread && (
					<div className={`${!showCreateThread ? 'hidden' : 'pt-4 md:pt-8'}`}>
						<DiscussionForm classId={classId} onCreateThread={openActiveThread} onCancel={handleCloseForm}/>
					</div>
				)}


				{openThread && activeThread && (
					<div className="left-[64px] bg-white pt-4 md:pt-8">
						<DiscussionThread thread={activeThread}/>
					</div>
				)}
			</div>
		</div>

	)
}

export default Page
