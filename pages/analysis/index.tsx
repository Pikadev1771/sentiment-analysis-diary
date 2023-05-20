import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import HeaderLayout from '../../components/layout/HeaderLayout';
import type { NextPageWithLayout } from '../_app';
import dynamic from 'next/dynamic';
import { getDiaryByTerm } from '../../api/diary';

import { useForm, SubmitHandler } from 'react-hook-form';
import moment from 'moment';
import Head from 'next/head';
import { Roboto_Mono } from 'next/font/google';

const LineChart = dynamic(() => import('../../components/chart/LineChart'), {
  ssr: false,
});

const BubbleChart = dynamic(
  () => import('../../components/chart/BubbleChart'),
  {
    ssr: false,
  }
);

type DateFormProps = {
  startDate: string;
  endDate: string;
};

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Open_Sans'],
});

const AnalysisPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DateFormProps>();

  const [diaries, setDiaries] = useState([]); // 라인 차트 데이터
  const [keywords, setKeywords] = useState([]); // 버블 차트 데이터

  // 날짜 구하기
  const year = new Date().getFullYear(); // 년
  const month = new Date().getMonth(); // 월
  const day = new Date().getDate();

  const onSubmit: SubmitHandler<DateFormProps> = (data) => {
    getDiaryByTerm(data.startDate, data.endDate).then((res) => {
      setKeywords(res.data.keyWords);
      setDiaries(res.data.diaries);
    });
  };

  useEffect(() => {
    // line chart 초기 렌더링
    getDiaryByTerm(
      moment(new Date(year, month - 1, day)).format('YYYY-MM-DD'),
      moment(new Date()).format('YYYY-MM-DD')
    ).then((res) => {
      setKeywords(res.data.keyWords);
      setDiaries(res.data.diaries);
    });
  }, [day, month, year]);

  // 버블 차트
  let bubbleArr = [];
  if (keywords) {
    let arr = Object.entries(keywords); // [['재밌다', 6], ["하늘", 9]...]

    for (let i = 0; i < arr.length; i++) {
      let obj = { 키워드: '', 횟수: undefined };
      obj['키워드'] = arr[i][0];
      obj['횟수'] = arr[i][1];
      bubbleArr.push(obj);
    }
  }

  const bubbleChartData = {
    children: [
      {
        키워드: '',
        children: bubbleArr,
      },
    ],
  };

  interface DiaryProps {
    diaryId: number;
    memberId: number;
    nickName: string;
    title: string;
    content: string;
    createdAt: any;
    emotion: any;
    keywords: Array<number>;
    modifiedAt: string;
  }
  // 라인 차트
  let lineArr = diaries?.map((el: DiaryProps) => {
    let newEl = { x: undefined, y: undefined };
    newEl.x = el['createdAt'];
    newEl.y = el['emotion'];
    return newEl;
  });

  const lineChartData = [
    {
      id: 'Line Chart',
      data: lineArr,
    },
  ];

  return (
    <>
      <Head>
        <title>Analysis - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChartLayout>
        <ChartBox>
          <ChartTitle>기간별 감정 분석</ChartTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Search>
              <Input
                {...register('startDate', { required: true })}
                className={roboto_mono.className}
                id={'startDate'}
                type="date"
                defaultValue={`${moment(new Date(year, month - 1, day)).format(
                  'YYYY-MM-DD'
                )}`}
              />{' '}
              <span>부터</span>
            </Search>
            <Search>
              <Input
                {...register('endDate', { required: true })}
                className={roboto_mono.className}
                id={'endDate'}
                type="date"
                defaultValue={`${moment(new Date()).format('YYYY-MM-DD')}`}
              />{' '}
              <span> 까지</span>
            </Search>
            <Input type="submit" value={'검색'} />
          </Form>
          <LineChart data={lineChartData} />
          {bubbleArr.length > 0 && (
            <>
              <ChartTitle>키워드 분석</ChartTitle>
              <BubbleChart data={bubbleChartData} />
            </>
          )}
        </ChartBox>
      </ChartLayout>
    </>
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
  margin: 100px auto;

  @media screen and (max-width: 1023px) {
    margin: 40px auto;
  }
`;

const ChartBox = styled.div`
  width: 1200px;
  height: 1400px;
  padding: 20px 40px;
  background: ${({ theme }) => theme.color.cream};
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};

  @media screen and (max-width: 1023px) {
    width: 80vw;
    height: 100%;
  }

  @media screen and (max-width: 767px) {
    width: 90vw;
    padding: 4px;
  }
`;

const ChartTitle = styled.p`
  text-align: center;
  font-size: 30px;
  color: ${({ theme }) => theme.color.lightBrown};
  font-weight: 600;
  margin-top: 60px;

  @media screen and (max-width: 767px) {
    font-size: 22px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 3px solid ${({ theme }) => theme.color.brown};
  padding: 15px;
  margin: 40px 40px 0 40px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.color.lime};
  border-radius: 10px;

  @media screen and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  span {
    width: 30px;
  }

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
  outline: none;

  margin-left: 30px;
  margin-right: 6px;
  background: ${({ theme }) => theme.color.cream};

  font-weight: 600;
  text-align: center;

  @media screen and (max-width: 1023px) {
    width: 80%;
    font-size: 14px;
    margin-top: 6px;
  }

  ${(props) =>
    props.type === 'submit' &&
    css`
      width: 90px;
      background: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.brown};
      border: 3px solid ${({ theme }) => theme.color.brown};
      text-transform: uppercase;
      font-weight: 600;

      @media screen and (max-width: 1023px) {
        width: 60px;
        font-size: 14px;
        margin-right: 10px;
        width: 120px;
      }
    `}

  :hover {
    cursor: pointer;
  }
`;
