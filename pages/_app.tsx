import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global-style';
import { theme } from '../styles/theme';
import { JetBrains_Mono } from 'next/font/google';
import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <main className={jetBrains_Mono.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </ThemeProvider>
  );
}

const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '200', '600', '800'],
  fallback: ['Roboto'],
});
