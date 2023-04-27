import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import styles from '../../styles/DiaryForm.module.css';
import { Roboto } from 'next/font/google';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';
import {
  editDiary,
  getDiaryByDate,
  getDiaryById,
  deleteDiary,
} from '../../api/diary';

import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import HeaderLayout from '../../components/layout/HeaderLayout';
import type { NextPageWithLayout } from '../_app';
import HomeButton from '../../components/button/HomeButton';

import Image from 'next/image';
import SmallButton from '../../components/button/SmallButton';

export async function getServerSideProps(context: any) {
  const { date } = context.params;
  console.log('date >>>', date);
  const data = await getDiaryByDate(date);
  // const data = await getDiaryById(date);
  return { props: { data } }; // 컴포넌트에 넘겨줄 props
}

const DiaryPage: NextPageWithLayout = ({ data }: any) => {
  const router = useRouter();

  const handleDelete = () => {
    deleteDiary(data.diaryId).then(() => {
      console.log('data.diaryId >>', data.diaryId);
      router.push('/');
    });
  };

  return (
    <DiaryLayout>
      <DiaryBox>
        <ContentAndAnalysis>
          <Content>
            <DateBox>
              <h3>Date: </h3>
              <Date value={data.createdAt} readOnly />
            </DateBox>
            <TitleBox>
              <h3>Title:</h3>
              <Title value={data.title} readOnly />
            </TitleBox>
            <DiaryContent value={data.content} readOnly></DiaryContent>
            <Menu>
              <SmallButton
                onClick={() => {
                  router.push(`/edit/${data.diaryId}`);
                }}
              >
                Edit
              </SmallButton>
              <SmallButton onClick={handleDelete}>Delete</SmallButton>
            </Menu>
          </Content>
          <Analysis>
            <Image src="/emotion/happy.svg" width="65" height="65" alt="mood" />
            <p>Mood: {data.emotionString || `Happy`}</p>
            <p>Score: {data.emotion}</p>
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
