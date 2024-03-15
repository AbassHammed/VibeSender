import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { decryptData, encryptData } from '@/lib/utils';
import { Articles } from '@/types';

interface ArticleProviderProps {
  children: ReactNode;
}

interface ArticleContextProps {
  articles: Articles | null;
  setArticles: React.Dispatch<React.SetStateAction<Articles | null>>;
}

export const ArticleContext = createContext<ArticleContextProps | undefined>(undefined);

export const ArticleProvider: React.FC<ArticleProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Articles | null>(() => {
    if (typeof window !== 'undefined') {
      const storedArticles = sessionStorage.getItem('articles');
      try {
        return storedArticles ? JSON.parse(decryptData(storedArticles)) : null;
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
        sessionStorage.setItem('articles', encryptData(JSON.stringify(articles)));
      } else {
        sessionStorage.removeItem('articles');
      }
    }
  }, [articles]);

  return (
    <ArticleContext.Provider value={{ articles, setArticles }}>{children}</ArticleContext.Provider>
  );
};
