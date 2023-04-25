// import React from 'react';
// import styled from 'styled-components';
// import { css } from 'styled-components';
// import styles from '../../styles/DiaryForm.module.css';
// import { Roboto } from 'next/font/google';
// import { useForm, SubmitHandler } from 'react-hook-form';

// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { create_diary } from '@/redux/diarySlice';
// import { RootState } from '@/redux/store';
// import moment from 'moment';

// import { useRouter } from 'next/router';

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['100', '300', '400', '500', '700', '900'],
//   variable: '--roboto',
// });

// type DiaryFormProps = {
//   id: number;
//   date: string;
//   title: string;
//   content: string;
//   score: number | null;
// };

// export default function AddNew() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const diaryData = useSelector(
//     (state: RootState) => state.diaryReducer.diaryList
//   );

//   console.log('date >>>', router.query.date);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<DiaryFormProps>();

//   const onSubmit: SubmitHandler<DiaryFormProps> = (formData) => {
//     // 새 일기
//     let newDiary = {
//       ...formData,
//       id: diaryData.length + 1,
//       date: moment(new Date()).format('YYYY-MM-DD'),
//       score: null,
//     };

//     dispatch(create_diary(newDiary));
//     router.push('/');
//   };

//   return (
//     <AddNewLayout>
//       <DiaryFormContainer>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <TitleContainer>
//             <h3>Title</h3>
//             <DiaryInput
//               {...register('title', { required: true })}
//               id={'diaryTitle'}
//             />
//           </TitleContainer>
//           {errors.title && <p>제목을 작성해 주세요.</p>}
//           <DiaryTextarea
//             {...register('content', { required: true })}
//             id={'diaryContent'}
//           />

//           {errors.content && <p>일기를 작성해 주세요.</p>}
//           <DiaryInput type="submit" value={'SUBMIT'} />
//         </Form>
//       </DiaryFormContainer>
//     </AddNewLayout>
//   );
// }

// const AddNewLayout = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const DiaryFormContainer = styled.div`
//   width: 900px;
//   height: 800px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Form = styled.form`
//   width: 80%;
//   border: 8px solid blue;
//   height: 600px;
//   padding: 40px;
//   background: ${({ theme }) => theme.color.cream};
//   border: 4px solid ${({ theme }) => theme.color.brown};
//   box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
//   border-radius: 24px;
//   font-weight: 500;
//   font-size: 18px;
//   color: ${({ theme }) => theme.color.brown};
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const TitleContainer = styled.div`
//   display: flex;
// `;

// const DiaryInput = styled.input`
//   display: block;
//   box-sizing: border-box;
//   width: 100%;
//   height: 200px;
//   border-radius: 10px;
//   border: 4px solid ${({ theme }) => theme.color.brown};
//   padding: 10px 15px;
//   font-size: 16px;
//   color: ${({ theme }) => theme.color.brown};

//   ${(props) =>
//     props.id === 'diaryTitle' &&
//     css`
//       height: 60px;
//       margin-left: 20px;
//       background: ${({ theme }) => theme.color.lime};
//     `}

//   ${(props) =>
//     props.type === 'submit' &&
//     css`
//       background: ${({ theme }) => theme.color.pink};
//       color: ${({ theme }) => theme.color.brown};
//       border: 4px solid ${({ theme }) => theme.color.brown};
//       height: 60px;
//       text-transform: uppercase;
//       padding: 20px;
//       font-size: 14px;
//       font-weight: 100;
//       letter-spacing: 10px;

//       :hover {
//         cursor: pointer;
//       }
//     `}
// `;

// const DiaryTextarea = styled.textarea`
//   display: block;
//   box-sizing: border-box;
//   width: 100%;
//   height: 330px;
//   border-radius: 10px;
//   border: 4px solid ${({ theme }) => theme.color.brown};
//   padding: 10px 15px;
//   font-size: 16px;
//   color: ${({ theme }) => theme.color.brown};
// `;

import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ReactCalendar from '../../components/calendar/ReactCalendar';
import DiaryForm from '../../components/diaryForm/DiaryForm';

export default function AddNew() {
  return (
    <>
      <Head>
        <title>ment Analysis Diary</title>
      </Head>
      <div>
        <MainContainer>
          <Left>
            <ReactCalendar />
          </Left>
          <Right>
            <DiaryForm />
          </Right>
        </MainContainer>
      </div>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Left = styled.div`
  width: 50vw;
  min-width: 450px;
  max-width: 800px;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled(Left)`
  justify-content: left;
`;
