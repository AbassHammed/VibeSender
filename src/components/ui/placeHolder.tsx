import React from 'react';

interface PlaceholderProps {
  description?: string;
  imagePath: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ description, imagePath }) => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <img
      src={imagePath}
      alt="Placeholder"
      className="mb-4 max-w-[60%] max-h-[60%] items-center"
    />
    <p className="text-center">{description}</p>
  </div>
);

export default Placeholder;
