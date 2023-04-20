import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import styles from '../../styles/DiaryForm.module.css';
import { Roboto } from 'next/font/google';

import { useForm, SubmitHandler } from 'react-hook-form';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--roboto',
});

type DiaryFormProps = {
  diaryTitle: string;
  diaryContent: string;
};

export default function DiaryForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiaryFormProps>();

  const onSubmit: SubmitHandler<DiaryFormProps> = (diaryData) =>
    console.log(diaryData);

  console.log('diaryTitle >>>', watch('diaryTitle'));
  console.log('diaryContent >>>', watch('diaryContent'));

  return (
    <div>
      <DiaryFormContainer>
        <Container>
          {/* <h1>Today&apos;s Diary</h1>
          <div className={roboto.variable}>
            <p className={styles.text}>야호</p>
          </div> */}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <TitleContainer>
              <h3>Title</h3>
              <DiaryInput
                {...register('diaryTitle', { required: true })}
                id={'title'}
              />
            </TitleContainer>
            {errors.diaryTitle && <p>제목을 작성해 주세요.</p>}
            <DiaryTextarea
              {...register('diaryContent', { required: true })}
              id={'content'}
            />

            {errors.diaryContent && <p>일기를 작성해 주세요.</p>}
            <DiaryInput type="submit" value={'SUBMIT'} />
          </Form>
        </Container>
      </DiaryFormContainer>
    </div>
  );
}

const DiaryFormContainer = styled.div`
  width: 40vw;
  height: 90vh;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 500px;
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

const Form = styled.form`
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

const DiaryTextarea = styled.textarea`
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
`;

const TitleContainer = styled.div`
  display: flex;
`;
