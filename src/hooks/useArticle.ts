import { useContext } from 'react';

import { ArticleContext } from '@/Contexts';

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};
