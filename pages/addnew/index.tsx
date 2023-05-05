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

AddNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default AddNew;
