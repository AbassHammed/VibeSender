import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SmileIcon } from 'lucide-react';

interface EmojiProps {
  onChange: (value: string) => void;
}

const Emoji: React.FC<EmojiProps> = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>
      <PopoverContent className="w-ful">
        <Picker
          emojiSize={18}
          theme={JSON.parse(JSON.stringify(window.localStorage.getItem('theme')))}
          data={data}
          maxFrequentRows={1}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Emoji;
