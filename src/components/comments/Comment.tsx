// This component displays the basic comment template (user icon, username, comment, like/comment button)

// props: comment object?
//need: username, comment header, comment text, number of likes, number of comments

'use client';

import React from 'react';

type CommentProps = {
  //type classifications to make slight sizing and UI changes between the different views
  type?: 'preview' | 'reply',
  user_email: string,
  title: string,
  content: string,
  commentCount: number
};

const Comment: React.FC<CommentProps> = ({ type, user_email, title, content, commentCount = 2 }) => {
  const isPreview = type === 'preview'; //this is for the list of thread previews
  const isReply = type === 'reply'; //this is for the replies displayed in the discussion thread
  //default is the styling corresponding to the full discussion thread view


  return (
    <div className={`relative group bg-white rounded-lg font-dm flex flex-col ${isPreview ? 'gap-2 md:gap-3.5' : isReply ? 'gap-2 md:gap-4' : 'gap-3 md:gap-[20px]'}`}>

      {/* this div contains the user icon and username */}
      <div className={`flex items-center  ${isPreview ? 'gap-2.5 md:gap-[15px] mt-3' : 'gap-2.5 md:gap-[12px]'} `}>

        {/* profile picture? using a placeholder user icon for now*/}
        <div>
          <img className={`${isPreview ? 'w-[28px] h-[28px] md:w-[35px] md:h-[35px]' : 'w-7 h-7 md:w-[42px] md:h-[42px]'}`} src="/profile.svg" alt="user icon"/>
        </div>

        <p className={`w-[168px] text-[#483183] font-[500] ${isPreview ? 'text-sm md:text-[16px]' : 'text-sm md:text-[18px] font-semibold '} `}>{user_email}</p>
      </div>

      <h1 className={`font-[600] ${isPreview ? 'text-xl md:text-[24px]' : isReply ? 'hidden' : 'text-[22px] md:text-[32px]'} `}>{title}</h1>

      <p className={`font-[400] text-[20px] ${isPreview ? 'line-clamp-1 text-base md:text-[16px] mb-2' : isReply ? '-mt-2 pl-10 md:pl-[55px] text-base md:text-[20px]' : 'text-base md:text-[20px]'}`}>{content}</p>

      {/* this div contains the comment and like button info */}
      <div className={`${isReply ? 'pl-10 md:pl-[55px] w-fit gap-4' : ''} text-[#483183] flex items-center mb-3 gap-4 md:gap-6`}>
        <button className="flex items-center gap-[8px]"><img className="w-4 h-4 md:w-[20px] md:h-[20px]" src="/comment.svg" alt="comment icon"/>
          <p className={`${isPreview ? 'text-[14px]' : isReply ? 'hidden' : 'text-[16.8px]'} `}>{commentCount}</p>
          <p className={`${isReply ? 'text-[16px]' : 'hidden'} `}>Reply in thread</p>
        </button>
        <button className="flex items-center gap-[8px]"><img className="w-5 h-5 md:w-[20px] md:h-[20px]" src="/thumbs_up.svg" alt="like button" /><p className={`${isPreview ? 'text-[14px]' : 'text-[16px]'} `}>0</p></button>
        <button className={`absolute left-24 md:left-28 md:w-[24px] md:h-[24px] ${isPreview ? "hidden" : ""} ${isReply ? 'left-[240px] md:left-[273px]' : ""}`}><img className="" src="/trashcan.svg"></img></button>
      </div>
      {isPreview &&
        <button className="absolute right-[-20px] md:right-[-32px] mt-[120px] md:mt-[155px] hidden group-hover:flex gap-2 md:gap-[10px] font-[500] text-[12px] md:text-[16px] text-[#B3261E] md:w-[104px] md:h-[35px] rounded-sm bg-[#F6F3FF] px-2 py-1 md:px-3 md:py-2"
          style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>

          <img className="h-[15px] md:w-[18px] md:h-[19px]" src="/trashcan.svg" alt="trashcan icon" />
          Delete
        </button>
      }
    </div>
  )
}

export default Comment