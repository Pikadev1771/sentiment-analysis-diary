import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

export interface layoutPropsType {
  children: ReactElement;
}

export default function Layout({ children }: layoutPropsType) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

// footer 고정
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
