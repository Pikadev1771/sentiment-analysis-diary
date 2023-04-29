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

const AnalysisPage: NextPageWithLayout = () => {
  return (
    <ChartLayout>
      <ChartBox>
        <LineChart data={data} />
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
  height: 900px;
  padding: 30px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
`;

const data = [
  {
    id: 'norway',
    color: 'hsl(167, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 207,
      },
      {
        x: 'helicopter',
        y: 127,
      },
      {
        x: 'boat',
        y: 88,
      },
      {
        x: 'train',
        y: 220,
      },
      {
        x: 'subway',
        y: 264,
      },
      {
        x: 'bus',
        y: 192,
      },
      {
        x: 'car',
        y: 258,
      },
      {
        x: 'moto',
        y: 107,
      },
      {
        x: 'bicycle',
        y: 140,
      },
      {
        x: 'horse',
        y: 100,
      },
      {
        x: 'skateboard',
        y: 1,
      },
      {
        x: 'others',
        y: 204,
      },
    ],
  },
];
