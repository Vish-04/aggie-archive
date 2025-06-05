export default function Header() {
  return (
    <div>
      <div className="flex justify-between items-center pt-6 py-2 px-10">
      {/* <h1 className="text-black text-left text-2xl font-bold">noteorbit</h1> */}
            <img src="/logo.svg" alt="" />

      <div className="text-right flex gap-3">
        {/* <button */}
          {/* onClick={() => { window.location.href = '/api/auth/login'; }} */}
          {/* className=" rounded-lg px-4 py-1" */}
        {/* > */}
         
          <span className="text-black text-base mt-2 font-bold">sooperlayne</span>
           <img src="/profile.svg" alt="" />
        {/* </button> */}
      </div>
    </div>
    <hr className='mx-6 border-t-1 border-buttonGray py-3'/>

    </div>
    
  )
}