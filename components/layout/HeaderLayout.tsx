import Header from '../header/Header';
import { ReactElement, ReactNode } from 'react';

// export interface layoutPropsType {
//   children: ReactElement;
// }

const HeaderLayout = (props: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default HeaderLayout;
