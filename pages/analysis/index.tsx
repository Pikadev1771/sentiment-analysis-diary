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
        <BubbleChart data={bubbleChartData} />
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

const data = {
  keyWords: {
    기분: 3,
    재밌다: 6,
    비: 9,
    어두움: 3,
    하늘: 9,
    회사: 6,
    사이드프로젝트: 6,
    공부: 6,
  },
  diaries: [
    {
      diaryId: 3,
      emotion: -3,
      createdAt: '2023-04-03',
    },
    {
      diaryId: 4,
      emotion: -3,
      createdAt: '2023-04-05',
    },
    {
      diaryId: 2,
      emotion: -3,
      createdAt: '2023-04-13',
    },
    {
      diaryId: 8,
      emotion: -3,
      createdAt: '2023-04-13',
    },
    {
      diaryId: 5,
      emotion: -3,
      createdAt: '2023-04-14',
    },
    {
      diaryId: 9,
      emotion: -3,
      createdAt: '2023-04-14',
    },
    {
      diaryId: 6,
      emotion: -3,
      createdAt: '2023-04-18',
    },
    {
      diaryId: 17,
      emotion: -3,
      createdAt: '2023-04-18',
    },
    {
      diaryId: 7,
      emotion: -3,
      createdAt: '2023-04-20',
    },
    {
      diaryId: 11,
      emotion: 5,
      createdAt: '2023-04-20',
    },
    {
      diaryId: 16,
      emotion: -3,
      createdAt: '2023-04-23',
    },
    {
      diaryId: 13,
      emotion: -3,
      createdAt: '2023-04-24',
    },
    {
      diaryId: 12,
      emotion: -3,
      createdAt: '2023-04-26',
    },
    {
      diaryId: 10,
      emotion: 3,
      createdAt: '2023-04-27',
    },
  ],
};

//라인 차트

const lineChartData = [
  {
    id: 'Line Chart',
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

// 버블 차트
let arr = Object.entries(data.keyWords); // [['재밌다', 6], ["하늘", 9]...]
let bubbleArr = [];
for (let i = 0; i < arr.length; i++) {
  let obj = {};
  obj['키워드'] = arr[i][0];
  obj['횟수'] = arr[i][1];
  bubbleArr.push(obj);
}

const bubbleChartData = {
  children: [
    {
      키워드: '',
      children: bubbleArr,
    },
  ],
};

// const lineChartData = [
//   {
//     id: 'User Name',
//     color: 'hsl(167, 70%, 50%)',
//     data: [
//       {
//         x: '2023-04-01',
//         y: 8,
//       },
//       {
//         x: '04-02',
//         y: -2,
//       },
//       {
//         x: '04-03',
//         y: -7,
//       },
//       {
//         x: '04-04',
//         y: 0,
//       },
//       {
//         x: '04-05',
//         y: 6,
//       },
//       {
//         x: '04-06',
//         y: -1,
//       },
//       {
//         x: '04-07',
//         y: 9,
//       },
//     ],
//   },
// ];

// const bubbleChartData = {
//   children: [
//     {
//       키워드: '',
//       children: [
//         {
//           키워드: '산책',
//           횟수: 5,
//         },
//         {
//           키워드: '치킨',
//           횟수: 7,
//         },
//         {
//           키워드: '날씨',
//           횟수: 1,
//         },
//         {
//           키워드: '고양이',
//           횟수: 10,
//         },
//         {
//           키워드: '영화',
//           횟수: 1,
//         },
//         {
//           키워드: '자전거',
//           횟수: 2,
//         },
//         {
//           키워드: '회사',
//           횟수: 5,
//         },
//         {
//           키워드: '코딩',
//           횟수: 1,
//         },
//       ],
//     },
//   ],
// };
