import Head from 'next/head';

import ReactCalendar from '../components/calendar/ReactCalendar';

import styled from 'styled-components';
import DiaryList from '../components/diaryList/List';

import { ReactElement, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeaderLayout from '../components/layout/HeaderLayout';
import type { NextPageWithLayout } from './_app';
import Cookies from 'js-cookie';
import GoLogin from '../components/goLogin/GoLogin';
import useLogin from '../hooks/useLogin';

const Home: NextPageWithLayout = () => {
  const isLogin = useLogin();

  return (
    <>
      <Head>
        <title>Home - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MainContainer>
          <Left>
            <ReactCalendar />
          </Left>
          <Right>{isLogin ? <DiaryList /> : <GoLogin />}</Right>
        </MainContainer>
      </div>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 672px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Left = styled.div`
  width: 45vw;
  max-width: 900px;
  height: 90vh;
  padding: 0 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled(Left)``;

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default Home;
