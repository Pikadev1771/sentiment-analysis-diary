import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import styles from '../../styles/Diary.module.css';
import { Roboto } from 'next/font/google';

import { useForm } from 'react-hook-form';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--roboto',
});

export default function Diary() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log('diaryTitle >>>', watch('diaryTitle'));
  console.log('myDiary >>>', watch('myDiary'));

  return (
    <div>
      <DiaryContainer>
        <Container>
          {/* <h1>Today&apos;s Diary</h1>
          <div className={roboto.variable}>
            <p className={styles.text}>야호</p>
          </div> */}

          <DiaryForm onSubmit={handleSubmit(onSubmit)}>
            <TitleContainer>
              <h3>Title</h3>
              <DiaryInput
                {...register('diaryTitle', { required: true })}
                id={'title'}
              />
            </TitleContainer>
            {errors.diaryTitle && <p>제목을 작성해 주세요.</p>}
            <DiaryInput
              {...register('myDiary', { required: true })}
              id={'diary'}
            />

            {errors.myDiary && <p>일기를 작성해 주세요.</p>}
            <DiaryInput type="submit" value={'SUBMIT'} />
          </DiaryForm>
        </Container>
      </DiaryContainer>
    </div>
  );
}

const DiaryContainer = styled.div`
  width: 40vw;
  height: 90vh;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  padding: 32px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};

  p {
    font-size: 16px;
    color: ${({ theme }) => theme.color.red};
    text-align: right;
  }
`;

const DiaryForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
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
  margin: 10px 0 8px 0;

  ${(props) =>
    props.id === 'title' &&
    css`
      height: 60px;
      margin-left: 20px;
      background: ${({ theme }) => theme.color.lime};
    `}

  ${(props) =>
    props.type === 'submit' &&
    css`
      background: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.brown};
      border: 4px solid ${({ theme }) => theme.color.brown};
      height: 60px;
      text-transform: uppercase;
      margin-top: 20px;
      padding: 20px;
      font-size: 14px;
      font-weight: 100;
      letter-spacing: 10px;
    `}
`;

const TitleContainer = styled.div`
  display: flex;
`;
