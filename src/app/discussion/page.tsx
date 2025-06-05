'use client';

import Footer from '@/components/Footer';
import Header from '@/components/DummyHeader';
import Files from '@/components/Files';
import { useRouter } from 'next/navigation';

export default function Notes(){
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
                <div className='flex flex-wrap gap-8 bg-purple w-[1400px] h-[641px] rounded-lg p-8'>
                    <button onClick={() => router.push('/notes/upload')}
                    className="border-2 border-darkPurple border-dashed rounded-lg text-darkPurple w-[192px] h-[255px]">+ Upload Note</button>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                    <Files></Files>
                   
                </div>

            </div>

            <Footer></Footer>

        </div>
        
    );

}