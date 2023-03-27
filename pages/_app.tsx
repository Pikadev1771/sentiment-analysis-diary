import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global-style';
import { theme } from '../styles/theme';
import { JetBrains_Mono } from '@next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <main className={jetBrains_Mono.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

const jetBrains_Mono = JetBrains_Mono({
  weight: ['100', '300', '400', '500', '700', '200', '600', '800'],
  display: 'swap',
  fallback: [
    '-apple-system',
    'Malgun Gothic',
    'Apple SD Gothic Neo',
    'Roboto',
    'sans-serif',
  ],
});
