import type { AppProps } from 'next/app';

import { DM_Serif_Display, Open_Sans, Roboto_Mono } from 'next/font/google';
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
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--open_sans',
  fallback: ['Noto_Sans'],
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Open_Sans'],
});

const dm_serif_display = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--dm_serif_display',
  fallback: ['Open_Sans'],
});
