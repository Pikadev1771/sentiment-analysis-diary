import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import styles from '../../styles/DiaryForm.module.css';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';
import { getDiaryByDate, getDiaryById, deleteDiary } from '../../api/diary';

import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import HeaderLayout from '../../components/layout/HeaderLayout';
import type { NextPageWithLayout } from '../_app';
import HomeButton from '../../components/button/HomeButton';

import Image from 'next/image';
import SmallButton from '../../components/button/SmallButton';
import Head from 'next/head';
import { Roboto_Mono } from 'next/font/google';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Open_Sans'],
});

export async function getServerSideProps(context: any) {
  const { date } = context.params;

  return { props: { date } };
}

interface DiaryDataProps {
  diaryId: number;
  title: string;
  content: string;
  createdAt: string;
  emotion: number;
}

const DiaryPage: NextPageWithLayout = ({ date }: any) => {
  const router = useRouter();

  const [diaryData, setDiaryData] = useState<DiaryDataProps | undefined>(); // 일기 데이터

  useEffect(() => {
    getDiaryByDate(date).then((res) => {
      setDiaryData(res.data);
    });
  }, [date]);

  const handleDelete = (id: number | undefined) => {
    deleteDiary(id).then(() => {
      router.push('/');
    });
  };

  let mood;
  const score = diaryData?.emotion;
  if (score) {
    if (score > 6) mood = 'Happy';
    if (score > 2 && score <= 6) mood = 'Good';
    if (score > -2 && score <= 2) mood = 'Soso';
    if (score > -6 && score <= -2) mood = 'Bad';
    if (score >= -10 && score <= -6) mood = 'Depressed';
  }

  return (
    <>
      <Head>
        <title>Diary - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DiaryLayout>
        <DiaryBox>
          <ContentAndAnalysis>
            <Content>
              <DateBox>
                <span>Date: </span>
                <Date
                  className={roboto_mono.className}
                  value={diaryData?.createdAt}
                  readOnly
                />
              </DateBox>
              <TitleBox>
                <span>Title:</span>
                <Title value={diaryData?.title} readOnly />
              </TitleBox>
              <DiaryContent value={diaryData?.content} readOnly></DiaryContent>
              <Menu>
                <MenuBtn
                  onClick={() => {
                    router.push(
                      {
                        pathname: `/edit/${date}`,
                        query: {
                          id: diaryData?.diaryId,
                        },
                      },
                      `/edit/${date}`
                    );
                  }}
                >
                  Edit
                </MenuBtn>
                <MenuBtn onClick={() => handleDelete(diaryData?.diaryId)}>
                  Delete
                </MenuBtn>
              </Menu>
            </Content>
            <Analysis>
              <ImageContainer>
                <Image
                  src={`/emotion/${mood?.toLowerCase() || 'soso'}.svg`}
                  width="60"
                  height="60"
                  alt="mood"
                />
              </ImageContainer>
              <p>Mood: {mood || 'Soso'}</p>
              <p>Score: {diaryData?.emotion}</p>
            </Analysis>
          </ContentAndAnalysis>
        </DiaryBox>
      </DiaryLayout>
    </>
  );
};

DiaryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default DiaryPage;

const DiaryLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
`;

const DiaryBox = styled.div`
  width: 1000px;
  height: 700px;
  padding: 90px;
  background: ${({ theme }) => theme.color.lime};
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  /* border-radius: 24px; */
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.lightBrown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};
`;

const ContentAndAnalysis = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Analysis = styled.div`
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid ${({ theme }) => theme.color.lightBrown};
  background: ${({ theme }) => theme.color.cream};

  box-shadow: 4px 4px 0px 0px ${({ theme }) => theme.color.lightBrown};
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};

  margin-left: 50px;
  p {
    font-size: 24px;
    font-style: italic;

    font-weight: 600;
    margin-top: 6px;
  }
`;

const ImageContainer = styled.div`
  margin: 8px;

  position: relative;
  animation: fadeInTop 1s;

  @keyframes fadeInTop {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  /* animation: bounce_frames 0.5s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  animation-iteration-count: 5;

  @keyframes bounce_frames {
    from {
      transform: translate3d(0, -60px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  } */
`;

const DateBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  span {
    font-size: 24px;
    width: 80px;
    font-style: italic;
  }
`;

const Date = styled.input`
  width: 100%;
  display: block;
  box-sizing: border-box;
  height: 65px;
  text-align: center;
  outline: none;
  padding: 10px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.lightBrown};
  box-shadow: 4px 4px 0px 0px ${({ theme }) => theme.color.lightBrown};
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};

  :focus {
    outline: none;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 24px;
    width: 80px;
    font-style: italic;
  }
`;

const Title = styled.input`
  width: 100%;
  display: block;
  box-sizing: border-box;

  height: 65px;

  text-align: center;
  outline: none;

  padding: 10px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.lightBrown};
  box-shadow: 4px 4px 0px 0px ${({ theme }) => theme.color.lightBrown};
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};

  :focus {
    outline: none;
  }
`;

const DiaryContent = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 280px;

  margin-top: 10px;

  line-height: 1.4;
  resize: none;
  outline: none;

  outline: none;

  padding: 20px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.lightBrown};
  box-shadow: 4px 4px 0px 0px ${({ theme }) => theme.color.lightBrown};
  border-radius: 14px;
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};

  :focus {
    outline: none;
  }
`;

const Menu = styled.div`
  width: 100%;
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const MenuBtn = styled(SmallButton)`
  background: ${({ theme }) => theme.color.pink};
  color: ${({ theme }) => theme.color.brown};
  border: 2px solid ${({ theme }) => theme.color.brown};
  text-transform: uppercase;

  font-weight: 600;
`;
