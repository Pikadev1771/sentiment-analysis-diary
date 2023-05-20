import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';
import { createDiary } from '../../api/diary';
import Loading from '../loading';
import { Roboto_Mono } from 'next/font/google';

type DiaryFormProps = {
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
          <span>Date: </span>
          <DiaryInput
            {...register('createdAt', { required: true })}
            className={roboto_mono.className}
            id={'diaryDate'}
            value={router.query.date}
            readOnly
          />
        </DateAndTitleContainer>
        <DateAndTitleContainer>
          <span>Title:</span>
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
  width: 90%;
  height: 620px;
  padding: 45px;
  margin: 0 30px;

  background: ${({ theme }) => theme.color.lime};
  border: 3px solid ${({ theme }) => theme.color.lightBrown};
  border-radius: 24px;
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.lightBrown};
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBrown};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 6px;
    text-align: right;
  }

  @media screen and (max-width: 767px) {
    width: 80vw;
  }
`;

const DateAndTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  span {
    font-size: 24px;
    width: 80px;
  }
`;

const DiaryInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
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

  @media screen and (max-width: 767px) {
    height: 65px;
  }

  :focus {
    outline: none;
  }

  ${(props) => props.id === 'diaryDate' && css``}

  ${(props) => props.id === 'diaryTitle' && css``}

  ${(props) =>
    props.type === 'submit' &&
    css`
      background: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.brown};
      border: 4px solid ${({ theme }) => theme.color.brown};
      text-transform: uppercase;

      font-weight: 600;
      box-shadow: none;

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
  margin-top: 10px;

  line-height: 1.4;
  resize: none;
  outline: none;

  outline: none;

  padding: 20px;
  background: ${({ theme }) => theme.color.white};
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
