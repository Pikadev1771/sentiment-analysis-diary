import React from 'react';
import DiaryCard from './diaryCard';
import styled from 'styled-components';

const MockData = {
  diaryList: [
    {
      id: 1,
      date: '2023-04-01',
      title: '야호',
      content: '날씨 좋다~~!',
      score: 1,
    },
    {
      id: 2,
      date: '2023-04-02',
      title: '메리 크리스마스🎅🏽',
      content: '🎄🎄🎄',
      score: 0.5,
    },
    {
      id: 3,
      date: '2023-04-10',
      title: '해피 뉴이어',
      content: '행복한 2023년',
      score: 0.1,
    },
    {
      id: 4,
      date: '2023-04-13',
      title: '야호',
      content: '날씨 좋다~~!',
      score: 1,
    },
    {
      id: 5,
      date: '2023-04-16',
      title: '날씨가 넘 좋아요',
      content: '날씨가 미쳤어요 한강 가서 자전거 탔는데...',
      score: 0.5,
    },
    {
      id: 6,
      date: '2023-04-18',
      title: '해피 뉴이어',
      content: '행복한 2023년',
      score: 0.1,
    },
  ],
};

export default function DiaryList() {
  return (
    <Container>
      <Title>2023년 4월</Title>
      <List>
        {MockData.diaryList.map((diary) => {
          return (
            // eslint-disable-next-line react/jsx-key
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
    </Container>
  );
}

const Title = styled.p`
  text-align: center;
  margin: 10px;
  padding-left: 10px;
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};
`;

const Container = styled.div`
  width: 40vw;
  height: 90vh;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  /* align-content: flex-start; */
  flex-wrap: wrap;
`;

const List = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  align-content: center;
  /* align-content: flex-start; */
  flex-wrap: wrap;
`;
