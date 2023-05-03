import React from 'react';
import Footer from '../footer/Footer';

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { useReissueToken } from '../../hooks/useReissueToken';

// export interface layoutPropsType {
//   children: ReactElement;
// }

const Layout = (props: { children: ReactNode }) => {
  return (
    <Wrapper>
      {props.children}
      <Footer />
    </Wrapper>
  );
};

// footer 고정
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export default Layout;
