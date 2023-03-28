import Head from 'next/head';
import Image from 'next/image';
import { Noto_Sans_KR } from '@next/font/google';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import ReactCalendar from '../components/diary/ReactCalendar';
import Diary from '../components/diary/Diary';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--notosanskr',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentiment Analysis Diary</title>
      </Head>
      <div>
        {/* <h1>Sentiment Analysis Diary</h1>
        <div className={notoSansKr.variable}>
          <p className={styles.text}>야호</p>
        </div> */}
        <MainContainer>
          <ReactCalendar />

          <Diary />
        </MainContainer>
      </div>
    </>
  );
}
const MainContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
  width: 100%;
  border: 1px solid green;
`;
