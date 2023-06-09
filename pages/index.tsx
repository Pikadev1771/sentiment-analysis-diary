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
import MobileGoLogin from '../components/goLogin/MobileGoLogin';

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
            {!isLogin && <MobileGoLogin />}
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

  @media screen and (max-width: 767px) {
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

  @media screen and (max-width: 767px) {
    width: 100vw;
    height: 100%;
    flex-direction: column;
    padding: 10px 0;
  }
`;

const Right = styled(Left)`
  @media screen and (max-width: 767px) {
    margin-top: 20px;
  }
`;

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default Home;
