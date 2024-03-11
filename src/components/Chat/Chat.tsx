import React from 'react';

import { mockConversations } from '@/utils/constants';

import { MessageChat } from '.';
import ChatTopBar from './ChatTopBar';

const Chat: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopBar selectedConvo={mockConversations[0]} />
      <MessageChat selectedConvo={mockConversations[0]} />
    </div>
  );
};
export default Chat;
