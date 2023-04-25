import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

export default function DiaryCard({ date, title, content, score }: any) {
  return (
    <Card>
      <DiaryTitle>{title}</DiaryTitle>
      <Content>{content}</Content>
      <Date>
        <p>{date}</p>
      </Date>
    </Card>
  );
}

const Card = styled.div`
  width: 190px;
  height: 170px;
  padding: 10px;
  background: ${({ theme }) => theme.color.lime};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.brown};
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DiaryTitle = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 18px;
`;

const Content = styled.div`
  width: 150px;
  height: 60px;
  background: ${({ theme }) => theme.color.cream};
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
`;

const Date = styled.div`
  width: 100%;
  text-align: right;
  p {
    margin: 10px 20px;
  }
`;
