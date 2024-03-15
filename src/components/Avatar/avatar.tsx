import React from 'react';

import { cn } from '@/lib/utils';
import { color, Size } from '@/types';

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: Size;
  bordered?: boolean;
  borderColor?: color;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  bordered = false,
  borderColor = 'default',
  className,
  size = 'md',
}) => {
  const getBorderColorClass = (color: color) => {
    switch (color) {
      case 'success':
        return 'ring-green-500';
      case 'primary':
        return 'ring-blue-200';
      case 'warning':
        return 'ring-yellow-300';
      case 'danger':
        return 'ring-red-700';
      default:
        return 'ring-gray-500';
    }
  };

  const getAvatarSizeClass = (size: Size) => {
    switch (size) {
      case 'lg':
        return 'w-20 h-20';
      case 'md':
        return 'w-10 h-10';
      case 'sm':
        return 'w-8 h-8';
      case 'xl':
        return 'w-36 h-36';
      case 'xs':
        return 'w-6 h-6';
      default:
        return 'w-10 h-10';
    }
  };

  const avatarClass = cn(
    'rounded-full object-cover',
    bordered && `ring-2 ring-offset-2 ${getBorderColorClass(borderColor)}`,
    getAvatarSizeClass(size),
    className,
  );

  return (
    <div>
      <img
        className={avatarClass}
        src={src}
        alt={alt}
        onError={e => {
          e.currentTarget.src = '/placeholder.png';
          e.currentTarget.onerror = null;
        }}
      />
    </div>
  );
};

export default Avatar;
