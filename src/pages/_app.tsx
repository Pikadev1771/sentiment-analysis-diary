import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { JetBrains_Mono } from '@next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={jetBrains_Mono.className}>
      <Component {...pageProps} />
    </main>
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
