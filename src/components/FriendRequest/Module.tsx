import React, { useState } from 'react';

import { acceptFriendRequest, declineFriendRequest } from '@/firebase';

type ModuleProps = {
  requestId: string;
  senderId: string;
  recieverId: string;
  senderUserName: string;
};

const Module: React.FC<ModuleProps> = ({ senderUserName, recieverId, requestId, senderId }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleAccept = async () => {
    await acceptFriendRequest(requestId, senderId, recieverId);
  };

  const handleDecline = async () => {
    await declineFriendRequest(requestId);
  };

  return (
    <li onClick={handleClick}>
      <label htmlFor={senderUserName} className="block relative">
        <div className="w-full p-5 cursor-pointer rounded-lg border  shadow-sm ring-indigo-600">
          <div>
            <h3 className="leading-none font-medium">{senderUserName}</h3>
            <p className="mt-1 text-sm ">
              {' '}
              {`${senderUserName} just sent you a friend request, click to choose.`}
            </p>
          </div>
          {open && (
            <div className="items-center gap-2 mt-3 text-sm sm:flex">
              <button
                className="w-full mt-2 p-2.5 flex-1 bg-indigo-600 text-white rounded-md ring-offset-2 focus:ring-2"
                onClick={handleAccept}>
                Accept
              </button>
              <button
                onClick={handleDecline}
                aria-label="Close"
                className="w-full mt-2 p-2.5 flex-1 rounded-md border ring-offset-2 ring-indigo-600 focus:ring-2">
                Decline
              </button>
            </div>
          )}
        </div>
      </label>
    </li>
  );
};

export default Module;
