import React, { useEffect, useState } from 'react';
import DiaryCard from './Card';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SmallButton from '../button/SmallButton';
import { getDiaryByDate, getDiaryByUser } from '../../api/diary';
import Cookies from 'js-cookie';
import { JetBrains_Mono, Roboto } from 'next/font/google';

const jetBrains_Mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '200', '600', '800'],
  fallback: ['Robot_Mono'],
});

export default function DiaryList() {
  const [diaryList, setDiaryList] = useState<any | undefined>();

  const nickName = Cookies.get('nickName');

  useEffect(() => {
    getDiaryByUser().then((res) => {
      setDiaryList(res.data.data.slice(0, 6));
    });
  }, []);

  return (
    <Container>
      <ListHeader>
        <Title className={jetBrains_Mono.className}>
          <span>{nickName}</span>`s Diary
        </Title>
        {/* <ShowMoreBtn>▶️ 더 보기</ShowMoreBtn> */}
      </ListHeader>
      <List>
        {diaryList?.map(
          (diary: {
            diaryId: any;
            createdAt: any;
            title: any;
            content: any;
          }) => {
            return (
              <DiaryCard
                key={diary.diaryId}
                date={diary.createdAt}
                title={diary.title}
                content={diary.content}
              />
            );
          }
        )}
      </List>
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 8px;
`;
const Title = styled.span`
  margin: 10px;
  padding-left: 10px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};

  span {
    /* color: ${({ theme }) => theme.color.lime};
    background-color: ${({ theme }) => theme.color.brown};
    padding: 6px 10px;
    border-radius: 10px;
    margin-right: 4px; */
    /* text-decoration: underline;
    text-decoration-style: wavy; */
  }
`;

const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  /* align-content: flex-start; */
  flex-wrap: wrap;
`;

const ShowMoreBtn = styled.button`
  padding: 3px 10px;
  border: none;
  /* border: 2px solid ${({ theme }) => theme.color.brown}; */
  /* border-radius: 10px; */
  color: ${({ theme }) => theme.color.brown};
  /* background-color: ${({ theme }) => theme.color.cream}; */
  background-color: inherit;
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-position: under;
  :hover {
    cursor: pointer;
  }
`;

// const diaryData = [
//   {
//     id: 1,
//     date: '2023-04-01',
//     title: '야호',
//     content: '날씨 좋다~~!',
//     score: 1,
//   },
//   {
//     id: 2,
//     date: '2023-04-02',
//     title: '메리 크리스마스🎅🏽',
//     content: '🎄🎄🎄',
//     score: 0.5,
//   },
//   {
//     id: 3,
//     date: '2023-04-10',
//     title: '해피 뉴이어',
//     content: '행복한 2023년',
//     score: 0.1,
//   },
//   {
//     id: 4,
//     date: '2023-04-13',
//     title: '야호',
//     content: '날씨 좋다~~!',
//     score: 1,
//   },
// ];
