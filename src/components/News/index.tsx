import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

const Play: React.FC = () => {
  const { asPath } = useRouter();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setShowPage(/#Search$/.test(window.location.hash));
    };
    /#Search$/.test(asPath) ? setShowPage(true) : '';
    window.addEventListener('hashchange', checkHash, false);
    checkHash();

    return () => {
      window.removeEventListener('hashchange', checkHash, false);
    };
  }, [asPath]);

  return (
    <div className={showPage ? 'flex' : 'hidden'}>
      <div className="fixed inset-0 w-full h-full bg-black opacity-40 z-40" />
    </div>
  );
};

export default Play;
