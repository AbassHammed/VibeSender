import { useEffect, useState } from 'react';

const useDimensions = () => {
  const getDimensions = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [dimensions, setDimensions] = useState(getDimensions);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setDimensions(getDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return dimensions;
};

export default useDimensions;
