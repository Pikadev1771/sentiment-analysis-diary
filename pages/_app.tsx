import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global-style';
import { theme } from '../styles/theme';
import { JetBrains_Mono } from 'next/font/google';
import Layout from '../components/layout/Layout';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <main className={jetBrains_Mono.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '200', '600', '800'],
  fallback: ['Roboto'],
});
