import type { AppProps } from 'next/app';

import { JetBrains_Mono } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Layout from '../components/layout/Layout';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {getLayout(
          <main className={jetBrains_Mono.className}>
            <Component {...pageProps} />
          </main>
        )}
      </ThemeProvider>
    </Provider>
  );
}

const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '200', '600', '800'],
  fallback: ['Roboto'],
});
