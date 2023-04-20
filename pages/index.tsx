import Head from 'next/head';

import ReactCalendar from '../components/calendar/ReactCalendar';
import DiaryForm from '../components/diaryForm/DiaryForm';
import styled from 'styled-components';
import DiaryList from '../components/diaryList/diaryList';

import Button from '../components/button/Button';
import GoLogin from '../components/goLogin/GoLogin';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sentiment Analysis Diary</title>
      </Head>
      <div>
        <MainContainer>
          <Left>
            <ReactCalendar />
          </Left>
          <Right>
            {/* <DiaryList /> */}
            <GoLogin />
          </Right>
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

const Left = styled.div`
  width: 45vw;
  min-width: 450px;
  max-width: 800px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled(Left)``;
