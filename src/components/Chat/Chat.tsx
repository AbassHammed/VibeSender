import React from 'react';

import { ChatTopBar } from '@/Components/Chat';
import { mockConversations } from '@/data';

import { MessageChat } from '.';

const Chat: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopBar selectedConvo={mockConversations[0]} />
      <MessageChat selectedConvo={mockConversations[0]} />
    </div>
  );
};
export default Chat;
