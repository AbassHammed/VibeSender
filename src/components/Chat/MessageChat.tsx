import React, { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getMessages, UserQuery } from '@/firebase';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { conversation, Message, User } from '@/types';
import mockMessages from '@/utils/constants';
import { AnimatePresence, motion } from 'framer-motion';

import { ChatBottomBar } from '.';

type MessageChatProps = {
  selectedConvo: conversation;
};

const MessageChat: React.FC<MessageChatProps> = ({ selectedConvo }) => {
  const { user } = useAuth();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const getChats = async () => {
      //   const chats = await getMessages(selectedConvo.conversationId);
      //   setMessages(chats || messages);
    };
    const fetchFriendData = async (participantId: string) => {
      if (user) {
        const selectedUserDoc = await UserQuery(participantId);
        const currentUserDoc = await UserQuery(user.uid);
        if (selectedUserDoc && currentUserDoc) {
          setSelectedUser(selectedUserDoc);
          setCurrentUser(currentUserDoc);
        }
      }
    };

    const friendId =
      user?.uid === selectedConvo.participants[0]
        ? selectedConvo.participants[1]
        : selectedConvo.participants[0];
    fetchFriendData(friendId);

    getChats();
  }, [selectedConvo.conversationId, selectedConvo.participants, user, messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <AnimatePresence>
          {messages?.map((message, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 p-4 whitespace-pre-wrap',
                message.userId !== selectedUser?.uid ? 'items-end' : 'items-start',
              )}>
              <div className="flex gap-3 items-center">
                {message.userId === selectedUser?.uid && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedUser.imageUrl}
                      alt={`${selectedUser.fullName} profile image.`}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">{message.message}</span>
                {message.userId !== selectedUser?.uid && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={currentUser?.imageUrl}
                      alt={`${currentUser?.fullName} profile image.`}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottomBar />
    </div>
  );
};
export default MessageChat;
