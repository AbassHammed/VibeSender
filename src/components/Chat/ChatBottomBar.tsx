import React, { useRef, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizonal,
  Smile,
  ThumbsUp,
} from 'lucide-react';

import Emoji from './Emoji';

type ChatBottomBarProps = {};

const ChatBottomBar: React.FC<ChatBottomBarProps> = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState<Message>();
  const [chat, setChat] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  const handleThumbsUp = () => {
    if (user) {
      const newMessage: Message = {
        userId: user.uid,
        message: '👍',
        timestamp: String(serverTimestamp()),
        read: false,
        type: 'emoji',
      };
      setMessage(newMessage);
    }
    setChat('');
  };

  const handleSend = async () => {};

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setChat(prev => prev + '\n');
    }
  };

  return <div>Have a good coding</div>;
};
export default ChatBottomBar;
