export default function landingPageBlocks({ text1, text2 }) {
  return (
     <div className="w-[460px] h-[530px] bg-mainGray rounded-2xl flex flex-col justify-end p-12">
                 <h1 className='text-black text-[40px] font-bold '>{text1}</h1>
                 <h1 className='text-black text-[40px] font-bold '>{text2}</h1>
     </div>
  );
}