import Head from 'next/head';
import styled from 'styled-components';
import ReactCalendar from '../components/diary/ReactCalendar';
import Diary from '../components/diary/Diary';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentiment Analysis Diary</title>
      </Head>
      <div>
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
  width: 100%;
  border: 1px solid green;
`;
