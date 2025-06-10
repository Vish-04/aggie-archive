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
    content: string
  };

const Comment: React.FC<CommentProps> = ({ type, user_email, title, content }) => {
    const isPreview = type === 'preview'; //this is for the list of thread previews
    const isReply = type === 'reply'; //this is for the replies displayed in the discussion thread
    //default is the styling corresponding to the full discussion thread view

       
    return (
        <div className={`bg-white rounded-lg font-dm flex flex-col ${isPreview ? 'gap-[13px]' : isReply ? 'gap-0' : 'gap-[20px]'}`}>

            {/* this div contains the user icon and username */}
            <div className={`flex items-center w-[168.8px] ${isPreview ? 'gap-[9px]' : 'gap-[12px]'} `}>
                
                {/* profile picture? using a placeholder user icon for now*/}
                <div>
                    <img className={`${isPreview ? 'w-[45px] h-[45px]' : 'w-[50px] h-[50px]'} `} src="/user.svg" alt="user icon"/> 
                </div>
                
                <p className={`${isPreview ? 'text-[16px]' : 'text-[18px] font-semibold '} `}>{user_email}</p>
            </div>

            <h1 className={`font-semibold ${isPreview ? 'text-[24px]' : isReply ? 'hidden' : 'text-[32px]'} `}>{title}</h1>
            
            <p className={`${isPreview ? 'line-clamp-1 text-[16px] mb-2' : isReply ? 'pl-[63px] mb-4' : 'text-[20px]'}`}>{content}</p>
            
            {/* this div contains the comment and like button info */}
            <div className={`${isReply ? 'pl-[55px] w-fit gap-4' : ''} text-[#483183] flex items-center justify-between mb-3 w-[97px]`}>
                <button className="flex items-center gap-[8px]"><img className="w-[20px] h-[20px]" src="/comment.svg" alt="comment icon"/>
                    <p className={`${isPreview ? 'text-[14px]' : isReply ? 'hidden' : 'text-[16.8px]'} `}>0</p>
                    <p className={`${isReply ? 'text-[16px]' : 'hidden'} `}>Reply in thread</p>
                </button>
                <button className="flex items-center gap-[8px]"><img className="w-[20px] h-[20px]" src="/thumbs_up.svg" alt="like button"/><p className={`${isPreview ? 'text-[14px]' : 'text-[16px]'} `}>0</p></button>
            </div>
        </div>
    )
}

export default Comment