import Cookies from 'js-cookie';

import Header from '../header/Header';
import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

// export interface layoutPropsType {
//   children: ReactElement;
// }

const HeaderLayout = (props: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <HeaderLayoutContainer>
      <Header />
      {props.children}
    </HeaderLayoutContainer>
  );
};

const HeaderLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default HeaderLayout;
