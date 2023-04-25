import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import styles from '../../styles/DiaryForm.module.css';
import { Roboto } from 'next/font/google';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { create_diary } from '@/redux/diarySlice';
import { RootState } from '@/redux/store';
import moment from 'moment';

import { useRouter } from 'next/router';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--roboto',
});

type DiaryFormProps = {
  id: number;
  date: string | string[] | undefined;
  title: string;
  content: string;
  score: number | null;
  emotion: string;
};

export default function DiaryForm() {
  const router = useRouter();

  const { date } = router.query;

  const dispatch = useDispatch();
  const diaryData = useSelector(
    (state: RootState) => state.diaryReducer.diaryList
  );

  console.log('date >>>', router.query.date);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiaryFormProps>();

  const onSubmit: SubmitHandler<DiaryFormProps> = (formData) => {
    // 새 일기
    let newDiary = {
      ...formData,
      id: diaryData.length + 1,
      date: date,
      score: null,
      emotion: 'good',
    };

    dispatch(create_diary(newDiary));
    router.push('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleContainer>
        <h3>Title</h3>
        <DiaryInput
          {...register('title', { required: true })}
          id={'diaryTitle'}
        />
      </TitleContainer>
      {errors.title && <p>제목을 작성해 주세요.</p>}
      <DiaryTextarea
        {...register('content', { required: true })}
        id={'diaryContent'}
      />

      {errors.content && <p>일기를 작성해 주세요.</p>}
      <DateContainer>
        <p>{`${date?.slice(0, 4)}년 ${date?.slice(5, 7)}월 ${date?.slice(
          8
        )}일`}</p>
      </DateContainer>
      <DiaryInput type="submit" value={'SUBMIT'} />
    </Form>
  );
}

// const AddNewLayout = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const DiaryFormContainer = styled.div`
//   width: 1000px;
//   height: 800px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Form = styled.form`
  width: 85%;
  border: 8px solid blue;
  height: 520px;
  padding: 40px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 6px;
    text-align: right;
  }
`;

const TitleContainer = styled.div`
  display: flex;
`;

const DiaryInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.brown};

  ${(props) =>
    props.id === 'diaryTitle' &&
    css`
      height: 65px;
      margin-left: 20px;
      background: ${({ theme }) => theme.color.lime};
    `}

  ${(props) =>
    props.type === 'submit' &&
    css`
      background: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.brown};
      border: 4px solid ${({ theme }) => theme.color.brown};
      height: 65px;
      text-transform: uppercase;
      padding: 20px;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 10px;

      :hover {
        cursor: pointer;
      }
    `}
`;

const DiaryTextarea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 220px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.brown};
`;

const DateContainer = styled.div`
  text-align: right;
`;
