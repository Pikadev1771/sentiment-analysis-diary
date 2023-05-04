import Cookies from 'js-cookie';
import { requestLogout } from '../../api/users';
import Header from '../header/Header';
import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';

// export interface layoutPropsType {
//   children: ReactElement;
// }

const HeaderLayout = (props: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default HeaderLayout;
