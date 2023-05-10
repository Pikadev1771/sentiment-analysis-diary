import styled from 'styled-components';
import { css } from 'styled-components';
import styles from '../../styles/DiaryForm.module.css';

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
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Roboto_Mono } from 'next/font/google';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Noto_Sans'],
});

interface DiaryDataProps {
  diaryId: number;
  title: string;
  content: string;
  createdAt: string;
  emotion: string;
  emotionString: string;
}

type DiaryFormProps = {
  diaryId: number;
  createdAt: string;
  title: string;
  content: string;
};

export async function getServerSideProps(context: any) {
  const { date } = context.params;
  const diaryId = context.query.id;
  const diaryData = await getDiaryById(diaryId);

  return { props: { date, diaryData } }; // 컴포넌트에 넘겨줄 props
}

const EditPage: NextPageWithLayout = ({ date, diaryData }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiaryFormProps>();

  const onSubmit: SubmitHandler<DiaryFormProps> = (editFormData) => {
    const formData: any = {
      ...editFormData,
      diaryId: diaryData.diaryId,
    };

    editDiary(diaryData.diaryId, formData).then(() => {
      router.push(`/diary/${date}`);
    });
  };

  return (
    <>
      <Head>
        <title>Edit - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DiaryLayout>
        <DiaryBox>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ContentAndAnalysis>
              <Content>
                <DateBox>
                  <h3>Date: </h3>
                  <Date
                    {...register('createdAt', { required: true })}
                    className={roboto_mono.className}
                    value={diaryData?.createdAt}
                    readOnly
                  />
                </DateBox>
                <TitleBox>
                  <h3>Title:</h3>
                  <Title
                    {...register('title', { required: true })}
                    className={roboto_mono.className}
                    defaultValue={diaryData?.title}
                  />
                </TitleBox>
                <DiaryContent
                  {...register('content', { required: true })}
                  className={roboto_mono.className}
                  defaultValue={diaryData?.content}
                ></DiaryContent>
                <Menu>
                  <SubmitBtn type="submit" value={'Submit'} />
                </Menu>
              </Content>
            </ContentAndAnalysis>
          </Form>
        </DiaryBox>
      </DiaryLayout>
    </>
  );
};

EditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <HeaderLayout>{page}</HeaderLayout>
    </Layout>
  );
};

export default EditPage;

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

const Form = styled.form``;

const ContentAndAnalysis = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 700px;
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
  margin-bottom: 4px;
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
  padding: 15px;
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

const SubmitBtn = styled.input`
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.cream};
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
  :hover {
    cursor: pointer;
  }
`;
