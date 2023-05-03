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

  const handleLogOut = () => {
    requestLogout().then(() => {
      Cookies.remove('access_token', { path: '' });
      Cookies.remove('refresh_token', { path: '' });
      Cookies.remove('nickName', { path: '' });
      router.push('/');
      window.location.reload();
    });
  };

  return (
    <>
      <Header handleLogOut={handleLogOut} />
      {props.children}
    </>
  );
};

export default HeaderLayout;
