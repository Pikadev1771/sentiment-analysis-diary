import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import HeaderLayout from '../../components/layout/HeaderLayout';
import type { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('../../components/chart/LineChart'), {
  ssr: false,
});

const BubbleChart = dynamic(
  () => import('../../components/chart/BubbleChart'),
  {
    ssr: false,
  }
);

const AnalysisPage: NextPageWithLayout = () => {
  return (
    <ChartLayout>
      <ChartBox>
        <LineChart data={lineChartData} />
        <BubbleChart data={bubbleChartDate} />
      </ChartBox>
    </ChartLayout>
  );
};

AnalysisPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default AnalysisPage;

const ChartLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
`;

const ChartBox = styled.div`
  width: 1000px;
  height: 1200px;
  padding: 30px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
`;

const lineChartData = [
  {
    id: 'User Name',
    color: 'hsl(167, 70%, 50%)',
    data: [
      {
        x: '2023-04-01',
        y: 8,
      },
      {
        x: '04-02',
        y: -2,
      },
      {
        x: '04-03',
        y: -7,
      },
      {
        x: '04-04',
        y: 0,
      },
      {
        x: '04-05',
        y: 6,
      },
      {
        x: '04-06',
        y: -1,
      },
      {
        x: '04-07',
        y: 9,
      },
    ],
  },
];

const bubbleChartDate = {
  키워드: 'User Name',
  color: 'hsl(266, 70%, 50%)',
  children: [
    {
      키워드: '일기',
      color: 'hsl(95, 70%, 50%)',
      children: [
        {
          키워드: '산책',
          color: 'hsl(192, 70%, 50%)',
          횟수: 5,
        },
        {
          키워드: '치킨',
          color: 'hsl(206, 70%, 50%)',
          횟수: 7,
        },
        {
          키워드: '날씨',
          color: 'hsl(169, 70%, 50%)',
          횟수: 1,
        },
        {
          키워드: '고양이',
          color: 'hsl(142, 70%, 50%)',
          횟수: 10,
        },
        {
          키워드: '영화',
          color: 'hsl(347, 70%, 50%)',
          횟수: 1,
        },
        {
          키워드: '자전거',
          color: 'hsl(347, 70%, 50%)',
          횟수: 2,
        },
        {
          키워드: '회사',
          color: 'hsl(347, 70%, 50%)',
          횟수: 5,
        },
        {
          키워드: '코딩',
          color: 'hsl(347, 70%, 50%)',
          횟수: 1,
        },
      ],
    },
  ],
};
