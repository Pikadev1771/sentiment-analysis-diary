import Head from 'next/head';
import Link from 'next/link';
import ReactCalendar from '../components/diary/ReactCalendar';
import Diary from '../components/diary/Diary';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentiment Analysis Diary</title>
      </Head>
      <div>
        <MainContainer>
          <Link href="/signup">회원가입</Link>
          <Link href="/login">로그인</Link>
          <ReactCalendar />
          <Diary />
        </MainContainer>
      </div>
    </>
  );
}
const MainContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border: 1px solid green;
`;
