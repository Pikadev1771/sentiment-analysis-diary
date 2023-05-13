import { Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Open_Sans'],
});

export default function DiaryCard({ date, title, content }: any) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/diary/${date}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <Card>
        <DiaryTitle>{title}</DiaryTitle>
        <ContentContainer>
          <Content>{content}</Content>
        </ContentContainer>
        <Date>
          <p className={roboto_mono.className}>{date}</p>
        </Date>
      </Card>
    </CardContainer>
  );
}

const CardContainer = styled.button`
  background-color: inherit;
  margin: 6px;
  border: none;
  :hover {
    cursor: pointer;
  }
`;
const Card = styled.div`
  width: 200px;
  height: 170px;
  margin: 4px;
  padding: 10px;
  background: ${({ theme }) => theme.color.lime};
  border: 2px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  /* border-radius: 10px; */
  font-weight: 400;
  color: ${({ theme }) => theme.color.brown};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DiaryTitle = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 18px;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const ContentContainer = styled.div`
  width: 165px;
  height: 65px;
  background: ${({ theme }) => theme.color.cream};
  border: 2px solid ${({ theme }) => theme.color.brown};
  /* border-radius: 10px; */
  padding: 10px;
`;
const Content = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  font-style: italic;
  font-weight: 400;
  font-size: 15px;
  text-align: left;
  line-height: 1.4;
`;

const Date = styled.div`
  width: 100%;
  text-align: right;
  p {
    margin: 8px 18px;
    font-size: 16px;
    font-weight: 600;
  }
`;
