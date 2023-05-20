import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ReactCalendar from '../../components/calendar/ReactCalendar';
import DiaryForm from '../../components/diaryForm/DiaryForm';

import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import HeaderLayout from '../../components/layout/HeaderLayout';
import type { NextPageWithLayout } from '../_app';

const AddNew: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>New - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
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
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1023px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 45px 0;
  }
`;

const Left = styled.div`
  width: 45vw;
  max-width: 900px;
  height: 80vh;
  padding: 0 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1023px) {
    width: 80vw;
    height: 100%;
    flex-direction: column;
    padding: 10px 0;
  }

  @media screen and (max-width: 767px) {
    width: 100vw;
    height: 100%;
    flex-direction: column;
    padding: 10px 0;
  }
`;

const Right = styled(Left)`
  @media screen and (max-width: 1023px) {
    margin-top: 50px;
  }
`;

AddNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default AddNew;
