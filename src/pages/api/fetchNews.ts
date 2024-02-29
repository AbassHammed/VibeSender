import { useCallback, useEffect } from 'react';

import { useCache, useSession } from '@/hooks';
import { Articles } from '@/types';

const useFetchAndUpdateArticles = () => {
  const { setArticles, articles } = useCache();
  const { sessionData } = useSession();

  const fetchData = useCallback(async () => {
    const lastFetch = localStorage.getItem('lastFetchTime_Articles');
    const now = new Date().getTime();

    // Check if more than an hour has passed since the last fetch
    if (lastFetch && now - parseInt(lastFetch) < 18000000 && articles?.results.length !== 0) {
      return;
    }

    const url = `https://newsdata.io/api/1/news?language=${sessionData?.currentUser?.lang}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&image=1&size=10`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching articles: ${response.statusText}`);
      }
      const data: Articles = await response.json();
      setArticles(data);

      // Update last fetch timestamp
      localStorage.setItem('lastFetchTime_Articles', now.toString());
    } catch (error) {
      console.error('Failed to fetch articles', error);
    }
  }, [sessionData?.currentUser?.lang, setArticles]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
};

export default useFetchAndUpdateArticles;
