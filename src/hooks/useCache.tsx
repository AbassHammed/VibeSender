import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Articles } from '@/types';

interface CacheProviderProps {
  children: ReactNode;
}

interface CacheContextProps {
  articles: Articles | null;
  setArticles: React.Dispatch<React.SetStateAction<Articles | null>>;
}

const CacheContext = createContext<CacheContextProps | undefined>(undefined);

export const CacheProvider: React.FC<CacheProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Articles | null>(() => {
    if (typeof window !== 'undefined') {
      const storedArticles = sessionStorage.getItem('articles');
      try {
        return storedArticles ? JSON.parse(storedArticles) : null;
      } catch (error) {
        console.error('Failed to parse articles from sessionStorage', error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (articles) {
        sessionStorage.setItem('articles', JSON.stringify(articles));
      } else {
        sessionStorage.removeItem('articles');
      }
    }
  }, [articles]);

  return (
    <CacheContext.Provider value={{ articles, setArticles }}>{children}</CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};
