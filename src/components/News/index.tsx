import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

const Play: React.FC = () => {
  const { asPath } = useRouter();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setShowPage(/#News$/.test(window.location.hash));
    };
    /#News$/.test(asPath) ? setShowPage(true) : ''; // Run on mount and whenever the hash changes
    window.addEventListener('hashchange', checkHash, false);

    // Initial check in case the component mounts with the correct hash
    checkHash();

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', checkHash, false);
    };
  }, [asPath]); // Empty dependency array means this effect runs once on mount

  return showPage ? <div className="z-50 text-black font-black">Hello, I am Hammed</div> : null;
};

export default Play;
