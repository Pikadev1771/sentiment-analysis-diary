import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';
import { createDiary } from '../../api/diary';
import Loading from '../loading';

type DiaryFormProps = {
  createdAt: string;
  title: string;
  content: string;
};

export default function DiaryForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const { date } = router.query; // 달력에서 선택한 날짜 ("YYYY-MM-DD")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiaryFormProps>();

  const onSubmit: SubmitHandler<DiaryFormProps> = (data) => {
    if (isSubmitted) return;
    setIsLoading(true);
    setIsSubmitted(true);

    const formData: any = {
      ...data,
      createdAt: date,
    };

    createDiary(formData)
      .then((res) => {
        router.push(`/`);
      })
      .catch((err) => {
        setIsSubmitted(false);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DateAndTitleContainer>
          <h3>Date: </h3>
          <DiaryInput
            {...register('createdAt', { required: true })}
            id={'diaryDate'}
            value={router.query.date}
            readOnly
          />
        </DateAndTitleContainer>
        <DateAndTitleContainer>
          <h3>Title:</h3>
          <DiaryInput
            {...register('title', { required: true })}
            id={'diaryTitle'}
          />
        </DateAndTitleContainer>
        {errors.title && <p>제목을 작성해 주세요.</p>}
        <DiaryTextarea
          {...register('content', { required: true })}
          id={'diaryContent'}
        />
        {errors.content && <p>일기를 작성해 주세요.</p>}
        <DiaryInput type="submit" value={'SUBMIT'} />
      </Form>
      {isLoading && (
        <ModalBackdrop>
          <Loading />
        </ModalBackdrop>
      )}
    </>
  );
}

const Form = styled.form`
  width: 85%;
  border: 8px solid blue;
  height: 620px;
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

const DateAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DiaryInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;

  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.brown};
  outline: none;

  ${(props) =>
    props.id === 'diaryDate' &&
    css`
      height: 65px;
      margin-left: 30px;
      background: ${({ theme }) => theme.color.pink};
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    `}

  ${(props) =>
    props.id === 'diaryTitle' &&
    css`
      height: 65px;
      margin-left: 20px;
      background: ${({ theme }) => theme.color.lime};
      font-size: 20px;
      font-weight: 600;
      text-align: center;
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
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 10px;
      font-weight: 600;

      :hover {
        cursor: pointer;
      }
    `}
`;

const DiaryTextarea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
  resize: none;
  outline: none;
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
