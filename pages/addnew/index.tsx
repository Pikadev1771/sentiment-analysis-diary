import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ReactCalendar from '../../components/calendar/ReactCalendar';
import DiaryForm from '../../components/diaryForm/DiaryForm';

export default function AddNew() {
  return (
    <>
      <Head>
        <title>ment Analysis Diary</title>
      </Head>
      <div>
        <MainContainer>
          <Left>
            <ReactCalendar />
          </Left>
          <Right>
            <DiaryForm />
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
  width: 50vw;
  min-width: 450px;
  max-width: 800px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled(Left)`
  justify-content: left;
`;
