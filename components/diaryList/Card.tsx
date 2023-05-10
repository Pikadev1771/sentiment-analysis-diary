import { Roboto_Mono, Noto_Sans_KR } from 'next/font/google';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--roboto_mono',
  fallback: ['Roboto', 'Noto_Sans'],
});

export default function DiaryCard({ date, title, content }: any) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/diary/${date}`);
  };

  return (
    <CardContainer className={roboto_mono.className} onClick={handleClick}>
      <Card>
        <DiaryTitle>{title}</DiaryTitle>
        <Content>{content}</Content>
        <Date>
          <p>{date}</p>
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
  width: 180px;
  height: 170px;
  padding: 10px;
  background: ${({ theme }) => theme.color.lime};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;

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

const Content = styled.div`
  width: 145px;
  height: 54px;
  background: ${({ theme }) => theme.color.cream};
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  padding: 9px;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const Date = styled.div`
  width: 100%;
  text-align: right;
  p {
    margin: 10px 20px;
  }
`;
