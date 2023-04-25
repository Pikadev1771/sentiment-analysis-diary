import Header from '../header/Header';
import { ReactElement, ReactNode } from 'react';

export interface layoutPropsType {
  children: ReactElement;
}
const HeaderLayout = ({ children }: layoutPropsType) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
