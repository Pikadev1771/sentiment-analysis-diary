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

import Loading from '../../components/loading';
import { Roboto_Mono } from 'next/font/google';

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

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Open_Sans'],
});

export async function getServerSideProps(context: any) {
  const { date } = context.params;
  const diaryId = context.query.id;
  const diaryData = await getDiaryById(diaryId);

  return { props: { date, diaryData } }; // 컴포넌트에 넘겨줄 props
}

const EditPage: NextPageWithLayout = ({ date, diaryData }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiaryFormProps>();

  const onSubmit: SubmitHandler<DiaryFormProps> = (editFormData) => {
    setIsLoading(true);

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
                  <span>Date: </span>
                  <Date
                    {...register('createdAt', { required: true })}
                    className={roboto_mono.className}
                    value={diaryData?.createdAt}
                    readOnly
                  />
                </DateBox>
                <TitleBox>
                  <span>Title:</span>
                  <Title
                    {...register('title', { required: true })}
                    defaultValue={diaryData?.title}
                  />
                </TitleBox>
                <DiaryContent
                  {...register('content', { required: true })}
                  defaultValue={diaryData?.content}
                ></DiaryContent>
                <Menu>
                  <SubmitBtn type="submit" value={'Submit'} />
                </Menu>
              </Content>
            </ContentAndAnalysis>
          </Form>
        </DiaryBox>
        {isLoading && (
          <ModalBackdrop>
            <Loading />
          </ModalBackdrop>
        )}
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
  margin: 100px auto;
`;

const DiaryBox = styled.div`
  width: 800px;
  height: 610px;
  padding: 50px;
  background: ${({ theme }) => theme.color.cream};
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  /* border-radius: 24px; */
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.lightBrown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};
`;

const Form = styled.form`
  height: 100%;
`;

const ContentAndAnalysis = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Analysis = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
  }
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

  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  padding: 10px 15px;

  color: ${({ theme }) => theme.color.lightBrown};
  height: 65px;

  background: ${({ theme }) => theme.color.pink};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  outline: none;
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

  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  padding: 10px 15px;

  color: ${({ theme }) => theme.color.lightBrown};

  height: 65px;

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
  height: 280px;
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  margin-top: 10px;
  padding: 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};
  background-color: white;

  line-height: 1.4;
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
  border: 2px solid ${({ theme }) => theme.color.lightBrown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.lightBrown};
  background-color: ${({ theme }) => theme.color.cream};
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
  :hover {
    cursor: pointer;
  }
`;

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed; // 화면 전체
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
