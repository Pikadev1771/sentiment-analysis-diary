import Head from 'next/head';

import ReactCalendar from '../components/calendar/ReactCalendar';
import DiaryForm from '../components/diaryForm/DiaryForm';
import styled from 'styled-components';
import DiaryList from '../components/diaryList/diaryList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentiment Analysis Diary</title>
      </Head>
      <div>
        <MainContainer>
          <ReactCalendar />
          <DiaryList />
        </MainContainer>
      </div>
    </>
  );
}
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
