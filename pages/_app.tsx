import type { AppProps } from 'next/app';

import {
  JetBrains_Mono,
  Noto_Sans_KR,
  Roboto,
  Roboto_Mono,
} from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/global-style';

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
        <main className={roboto_mono.className}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </ThemeProvider>
    </Provider>
  );
}

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Noto_Sans'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--roboto',
});

const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '200', '600', '800'],
  fallback: ['Roboto_Mono'],
});

const noto_sans_kr = Noto_Sans_KR({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  preload: false,
});
