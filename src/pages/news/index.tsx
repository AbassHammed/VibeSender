import React from 'react';

import Loading from '@/components/Loading';
import { auth } from '@/firebase';
import { useCache } from '@/hooks';
import { useAuthState } from 'react-firebase-hooks/auth';

import useFetchAndUpdateArticles from '../api/fetchNews';

const NewsPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { articles } = useCache();

  useFetchAndUpdateArticles();

  if (!user || !articles) {
    return <Loading />;
  }

  function getFirstFiftyWords(text: string): string {
    const words = text.split(/\s+/) || [];
    const firstFiftyWords = words.slice(0, 50).join(' ');

    // Append "..." only if the original text had more than 50 words.
    return words.length > 50 ? `${firstFiftyWords  }...` : firstFiftyWords;
  }

  return (
    <section className="my-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Daily News</h1>
        <p className="mt-3">Be updated about things happening around you</p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {articles.results.map(items => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={items.article_id}>
            <a href={items.link}>
              <img
                src={items.image_url}
                loading="lazy"
                alt={items.title}
                className="w-full h-48 rounded-t-md"
              />
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={items.source_icon}
                    className="w-full h-full rounded-full"
                    alt={items.creator}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900 dark:text-gray-300">{items.creator}</span>
                  <span className="block text-gray-400 text-sm">{items.pubDate}</span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900 dark:text-gray-300">{items.title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {getFirstFiftyWords(items.description)}
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsPage;
