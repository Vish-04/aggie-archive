'use client';

import React, {useState, useEffect} from 'react'
import Comment from '@/components/comments/Comment';
import DiscussionForm from '@/components/comments/DiscussionForm';
import DiscussionThread from '@/components/comments/DiscussionThread';
import {Class, Thread} from '@/utils/types';
import {fetchClass, fetchThreads} from '@/utils/db';
import {useParams, useRouter} from 'next/navigation';
import InvalidPage from '@/components/InvalidPage';


// class_id should be a prop
const Page = () => {
	const router = useRouter();

//   console.log(user);
	const [loading, setLoading] = useState(true);
	const [showCreateThread, setShowCreateThread] = useState(false);
	const [activeThread, setActiveThread] = useState<Thread | null>(null);
	const [showThreadsList, setShowThreadsList] = useState(true);
	const [openThread, setOpenThread] = useState<boolean>(false);
	const [threads, setThreads] = useState<Thread[]>([]);

	const params = useParams();
	const classId = params.classId?.[0] || 'No Class ID';
	const [classData, setClassData] = useState<Class | null>(null);
	const [invalidClass, setInvalidClass] = useState(false);

	useEffect(() => {
		const getClass = async () => {
			const newClassData = await fetchClass(classId);
			if ('message' in newClassData) {
				setInvalidClass(true);
			} else {
				setClassData(newClassData);
			}
		};

		getClass();
	}, [classId]);

	//moved this outside so i can call it later after user creates a new thread so they can see new thread when they click "back to discussion" without refreshing
	async function getThreads() {
		try {
			const res = await fetchThreads(classId);

			console.log("THREADS", res);
			if ('message' in res) {
				setThreads([]);
			} else {
				setThreads(res);
			}
		} catch (error) {
			console.error("Error", error);
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getThreads();
	}, []);

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
		getThreads();
	}

	if (invalidClass) {
		return <InvalidPage/>;
	}

	return (

		<div>
			<div className="px-6 md:px-12 lg:px-16 pt-6 md:pt-10">
				<div className="flex justify-between pt-4 pb-6 md:pb-4 md:py-8 lg:pb-12 pt-10">
					<div className="flex gap-[28px] items-center">
						{/* Course code (i.e., ECS162) */}
						<h1 className="text-3xl md:text-[40px] font-bold">{classData?.course_code}</h1>
						{/* Add to dashboard button */}
						{/*<button type="submit" className="bg-[#8347E7] font-[400] text-white text-[16px] rounded w-[178px] h-[36px]">+*/}
						{/*	Add to Dashboard*/}
						{/*</button>*/}
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
									className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px]  h-[36px] px-6 py-1"
									onClick={() => {
										setOpenThread(false)
										setShowThreadsList(true);
										setShowCreateThread(false);
										setActiveThread(null);
									}}>Back to Discussion</button>
				)}

				<div className={`rounded-lg ${showThreadsList ? '' : 'hidden'}`}>
					<button type="button" onClick={handleOpenForm}
									className="bg-[#ECEEF8] text-[#483183] border border-[#8347E7] text-[16px] rounded-[6px] h-[36px] w-[154px]">+
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
								<Comment type="preview" user_email={thread.user_email} title={thread.name} content={thread.content}/>
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
