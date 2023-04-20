import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

export default function DiaryCard({ date, title, content, score }) {
  return (
    <Card>
      <DiaryTitle>{title}</DiaryTitle>
      <Content>{content}</Content>
      <Date>{date}</Date>
    </Card>
  );
}

const Card = styled.div`
  width: 180px;
  height: 170px;
  padding: 10px;
  background: ${({ theme }) => theme.color.lime};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.brown};
  margin: 10px;
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
  text-align: right;
  margin: 10px;
`;
