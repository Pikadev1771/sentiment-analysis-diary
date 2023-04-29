import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import styles from '../../styles/DiaryForm.module.css';
import { Roboto } from 'next/font/google';
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

  const [diaryData, setDiaryData] = useState<DiaryDataProps | undefined>();

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
    <DiaryLayout>
      <DiaryBox>
        <ContentAndAnalysis>
          <Content>
            <DateBox>
              <h3>Date: </h3>
              <Date value={diaryData?.createdAt} readOnly />
            </DateBox>
            <TitleBox>
              <h3>Title:</h3>
              <Title value={diaryData?.title} readOnly />
            </TitleBox>
            <DiaryContent value={diaryData?.content} readOnly></DiaryContent>
            <Menu>
              <SmallButton
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
              </SmallButton>
              <SmallButton onClick={() => handleDelete(diaryData?.diaryId)}>
                Delete
              </SmallButton>
            </Menu>
          </Content>
          <Analysis>
            <Image
              src={`/emotion/${mood || 'Soso'}.svg`}
              width="65"
              height="65"
              alt="mood"
            />
            <p>Mood: {mood || 'Soso'}</p>
            <p>Score: {diaryData?.emotion}</p>
          </Analysis>
        </ContentAndAnalysis>
      </DiaryBox>
    </DiaryLayout>
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
  margin: 120px auto;
`;

const DiaryBox = styled.div`
  width: 800px;
  height: 610px;
  padding: 30px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
`;

const ContentAndAnalysis = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
`;

const Analysis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px 15px;

  p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
  }
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;

  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;

  color: ${({ theme }) => theme.color.brown};
  height: 65px;
  margin-left: 30px;
  background: ${({ theme }) => theme.color.pink};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  outline: none;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;

  color: ${({ theme }) => theme.color.brown};

  height: 65px;
  margin-left: 20px;
  background: ${({ theme }) => theme.color.lime};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  outline: none;
`;

const DiaryContent = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
  resize: none;
  outline: none;
`;

const Menu = styled.div`
  width: 100%;
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;
