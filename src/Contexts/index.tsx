import React from 'react';

import { ThemeProvider, Wrapper } from '@/Components/Wrapper';
import { NextUIProvider } from '@nextui-org/react';

import { ArticleProvider, SearchStateProvider, SessionProvider } from '.';

export { SessionContext, SessionProvider } from './SessionProvider';
export { ArticleContext, ArticleProvider } from './ArticleProvider';
export { SearchStateContext, SearchStateProvider } from './SearchStateProvider';

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
      <NextUIProvider>
        <SessionProvider>
          <ArticleProvider>
            <SearchStateProvider>
              <Wrapper>{children}</Wrapper>
            </SearchStateProvider>
          </ArticleProvider>
        </SessionProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
};
