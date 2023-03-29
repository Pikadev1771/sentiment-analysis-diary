import React from 'react';
import styled from 'styled-components';

import styles from '../../styles/Diary.module.css';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--notosanskr',
});

export default function Diary() {
  return (
    <div>
      <DiaryContainer>
        <Container>
          <h1>Today&apos;s Diary</h1>
          <div className={notoSansKr.variable}>
            <p className={styles.text}>야호</p>
          </div>
        </Container>
      </DiaryContainer>
    </div>
  );
}

const DiaryContainer = styled.div`
  width: 50vw;
  height: 90vh;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  border: 1px solid green;
`;
