import styled from 'styled-components';
import Link from 'next/link';
import SmallButton from '../button/SmallButton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

export default function Header() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');
  const nickName = Cookies.get('nickName');

  useEffect(() => {
    if (refreshToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken, refreshToken]);

  console.log(isLogin);

  const router = useRouter();
  return (
    <div>
      <HeaderContainer>
        <Link href={'/'}>
          <Image src="/logo/logo_01.svg" width="200" height="60" alt="HOME" />
          {/* <Logo onClick={() => router.push('/')}>Sentimant Analysis Diary</Logo> */}
        </Link>
        <Menu>
          {/* a */}
          {isLogin ? (
            <>
              <SmallButton
                onClick={() =>
                  router.push(
                    {
                      pathname: '/addnew',
                      query: {
                        date: moment(new Date()).format('YYYY-MM-DD'),
                      },
                    },
                    '/addnew'
                  )
                }
              >
                새 일기 쓰기
              </SmallButton>
              <ProfileBtn>
                {nickName ? nickName[0].toUpperCase() : `P`}
              </ProfileBtn>
            </>
          ) : (
            <LoginBtn onClick={() => router.push('/login')}>로그인</LoginBtn>
          )}
        </Menu>
      </HeaderContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.color.lightBrown};
  color: ${({ theme }) => theme.color.cream};
  padding: 0 40px;
  z-index: '10';
`;

const Logo = styled(SmallButton)`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.cream};
  border: none;
  background-color: inherit;
`;

const Menu = styled.div`
  width: 220px;
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DarkModeBtn = styled.button`
  background-color: inherit;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const ProfileBtn = styled.button`
  width: 45px;
  height: 45px;
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 100%;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.pink};
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
  :hover {
    cursor: pointer;
  }
`;

const LoginBtn = styled(SmallButton)`
  width: 100px;
  border: 2px solid ${({ theme }) => theme.color.cream};
  background-color: ${({ theme }) => theme.color.lightBrown};
  color: ${({ theme }) => theme.color.cream};
`;
