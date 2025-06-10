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
	const { user } = useUser();

	//   console.log(user);
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


	const handleAddToDashboard = async () => {
		console.log("Added to dashboard: ", classData?.course_code);
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

	const handleOpenForm = () => {
		setShowCreateThread(true);
		setShowThreadsList(false);
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
	}

	if (invalidClass) {
		return <InvalidPage />;
	}
	console.log("code", classData?.course_code);
	return (

		<div>
			<div className="px-16 pt-14">
				<div className="flex justify-between">
					<div className="flex gap-[28px] h-[52px] pb-14 pt-10 pl-18 items-center">
						{/* Course code (i.e., ECS162) */}

						<h1 className="text-[40px] h-[52px] font-bold">{classData?.course_code}</h1>
						{/* Add to dashboard button */}
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
									className="bg-[#F6F3FF] font-[400] text-[#483183] text-[16px] rounded w-[226px] h-[36px] border border-[#8347E7]"
									onClick={handleRemoveFromDashboard}
								>
									- Remove from Dashboard
								</button>
							)
						}
					</div>
					{/* "Discussion" and "Notes" toggle */}
					<div className="flex justify-center items-center">
						<div className="bg-[#F6F3FF] text-[#483183] font-medium w-[238px] p-1 rounded-[8px] h-fit">
							<button type="submit" className="bg-white text-[18px] w-[135px] h-[39px] rounded px-4 py-2"
								onClick={() => router.push(`/discussion/${classId}`)}>Discussion
							</button>
							<button type="submit" className="text-[18px] rounded h-[39px] px-5 py-2"
								onClick={() => router.push(`/notes/${classId}`)}>Notes
							</button>
						</div>
					</div>
				</div>
				{/* Display Back to Discussion button*/}
				{openThread && (

					<button type="submit"
						className="bg-[#F6F3FF] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px]  h-[36px] px-6 py-1"
						onClick={() => {
							setOpenThread(false)
							setShowThreadsList(true);
							setShowCreateThread(false);
							setActiveThread(null);
							getThreadsAndCommentCount();
						}}>Back to Discussion</button>
				)}

				<div className={`rounded-lg ${showThreadsList ? '' : 'hidden'}`}>
					<button type="button" onClick={handleOpenForm}
						className="bg-[#F6F3FF] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] h-[36px] w-[154px]">+
						Create thread
					</button>
					{/* temporary loading message */}
					{loading && (
						<p className="py-16">Loading threads...</p>
					)}
					<div className="flex flex-col gap-[17px] pt-8 ">
						{threads.map(thread => (
							<div key={thread.id} onClick={() => openActiveThread(thread)}
								className="role=button px-8 py-5 bg-white border border-[#CCCCFF] rounded-[10px] cursor-pointer">

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
					<div className={`${!showCreateThread ? 'hidden' : ''}  mt-16 `}>
						<DiscussionForm classId={classId} onCreateThread={openActiveThread} onCancel={handleCloseForm} />
					</div>
				)}


				{openThread && activeThread && (
					<div className="left-[64px] bg-white mt-8">
						<DiscussionThread thread={activeThread} />
					</div>
				)}
			</div>
		</div>

	)
}

export default Page
