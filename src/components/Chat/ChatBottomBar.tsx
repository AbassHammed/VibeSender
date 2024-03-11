import React, { useRef, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { FileImage, Mic, Paperclip, PlusCircle, SendHorizontal, ThumbsUp } from 'lucide-react';

import { Emoji } from '.';

const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

const ChatBottomBar: React.FC = () => {
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

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )}>
              <PlusCircle size={20} className="text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-2">
            {chat.trim() ? (
              <div className="flex gap-2">
                <button
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'h-9 w-9',
                    "'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                  )}>
                  <Mic size={20} className="text-muted-foreground" />
                </button>
                {BottombarIcons.map((icon, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'h-9 w-9',
                      "'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}>
                    <icon.icon size={20} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            ) : (
              <button
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'h-9 w-9',
                  "'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}>
                {' '}
                <Mic size={20} className="text-muted-foreground" />
              </button>
            )}
          </PopoverContent>
        </Popover>

        {!chat.trim() && (
          <div className="flex">
            {BottombarIcons.map((icon, idx) => (
              <button
                key={idx}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'h-9 w-9',
                  "'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}>
                <icon.icon size={20} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}>
          <Textarea
            autoComplete="off"
            value={chat}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <Emoji
              onChange={value => {
                setChat(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {chat.trim() ? (
          <button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={handleSend}>
            <SendHorizontal size={20} className="text-muted-foreground" />
          </button>
        ) : (
          <button
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0',
            )}
            onClick={handleThumbsUp}>
            <ThumbsUp size={20} className="text-muted-foreground" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ChatBottomBar;
