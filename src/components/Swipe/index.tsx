import React, { ReactNode, useState } from 'react';

import { useSwipeable } from 'react-swipeable';

interface SwipeProps {
  children: ReactNode;
  onSwipe: () => void;
}

const Swipe: React.FC<SwipeProps> = ({ children, onSwipe }) => {
  const [offset, setOffset] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onSwipe();
      setOffset(0);
    },
    onSwipedRight: () => {
      onSwipe();
      setOffset(0);
    },
    onSwiping: eventData => {
      if (eventData.dir === 'Left' || eventData.dir === 'Right') {
        setOffset(eventData.deltaX);
      }
    },
    preventScrollOnSwipe: false,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      style={{ transform: `translateX(${offset}px)`, transition: `transform 0.2s ease-out` }}>
      {children}
    </div>
  );
};

export default Swipe;
