import React from 'react';
import DiaryCard from './DiaryCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SmallButton from '../button/SmallButton';

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

export default function DiaryList() {
  const diaryData = useSelector(
    (state: RootState) => state.diaryReducer.diaryList
  );

  // To Do : 데이터 fetch

  return (
    <Container>
      <ListHeader>
        <Title>2023년 4월</Title>
        <ShowMoreBtn>▶️ 더 보기</ShowMoreBtn>
      </ListHeader>
      <List>
        {diaryData.slice(0, 6).map((diary) => {
          return (
            <DiaryCard
              key={diary.id}
              date={diary.date}
              title={diary.title}
              content={diary.content}
              score={diary.score}
            />
          );
        })}
      </List>
      {/* <Pagenation>1 2 3 4 5</Pagenation> */}
    </Container>
  );
}

const Container = styled.div`
  width: 85%;
  height: 520px;
  margin: 0 auto;

  display: flex;
  justify-content: left;
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
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
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

const Pagenation = styled.div`
  margin: 20px auto;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};
`;
