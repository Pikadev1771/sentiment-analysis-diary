import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  JetBrains_Mono,
  Noto_Sans_KR,
  Montserrat,
  Poppins,
} from '@next/font/google';

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={cls(
        jetBrains_Mono.className,
        notoSansKr.className,
        poppins.variable,
        montserrat.variable
      )}
    >
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

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});
const montserrat = Montserrat({
  weight: ['500', '700'],
  display: 'swap',
  variable: '--montserrat',
});
const poppins = Poppins({
  weight: ['600', '700'],
  display: 'swap',
  variable: '--poppins',
});
