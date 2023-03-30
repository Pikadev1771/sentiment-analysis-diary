import Head from 'next/head';

import ReactCalendar from '../components/calendar/ReactCalendar';
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
