import Head from 'next/head';

import ReactCalendar from '../components/calendar/ReactCalendar';

import styled from 'styled-components';
import DiaryList from '../components/diaryList/DiaryList';

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
        <title>sentiment Analysis Diary</title>
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

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default Home;
