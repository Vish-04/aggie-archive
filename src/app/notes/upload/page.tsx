'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Files from '@/components/Files';
import { useRouter } from 'next/navigation';

export default function Upload(){
    const router = useRouter();
    return(
        <div>   
            <Header></Header>
            <div className="flex justify-between items-center px-16 py-10">
                <div className="flex items-center gap-8">
                    <h1 className='font-bold text-[40px]'>ECS 162</h1>
                    <button className="bg-[#D9D9D9] rounded-lg p-2">+ Add to Dashboard</button>
                </div>
                <div className="flex gap-2 bg-purple p-1 rounded-lg">
                    {/* can change it here when we merge to main to the actual discussion page */}
                    <button onClick={() => router.push('/discussion')}
                     className="p-2 rounded-lg">Discussion</button> 
                    <button className="bg-white py-2 px-4 rounded-lg">Notes</button>
                </div>
            </div>
             <div className="flex justify-between items-center px-16">
                <div className=' border border-gray-400 w-[1400px] h-[641px] rounded-lg p-12'>
                    <h1 className='font-bold text-[32px] pb-8'>Upload a note</h1>
                    <div className='flex flex-col'>
                        {/* I made it not resizeable here but it can be changed just remove it */}
                        <textarea className=" w-full h-full leading-none border border-gray-400 rounded-lg text-[20px] px-6 pt-4 pb-0 resize-none" name="Title" id="title" placeholder="Title"></textarea>
                        <div className='pt-4'>
                            <button className=' w-[1300px] h-[330px] '> 
                                <img src="/upload.svg" alt="" />
                                </button>
                        </div>
                        <div className='flex justify-end gap-4 py-6'>
                            {/* for now the cancel button reroutes to notes page but can change it so that if the user uploads a file but doesn't want it then it will be gone */}
                            <button className='bg-gray-300 px-4 py-2 rounded-lg text-[20px]'
                                onClick={() => router.push('/notes')}>
                                Cancel
                            </button>
                            <button className='bg-gray-300 px-4 py-2 rounded-lg text-[20px]'>Upload File</button>
                        </div>
                        

                    </div>
                   
                   
                   
                </div>

            </div>

            <Footer></Footer>

        </div>
        
    );

}