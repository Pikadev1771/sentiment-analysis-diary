import styled from 'styled-components';
import Link from 'next/link';
import SmallButton from '../button/SmallButton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import Cookies from 'js-cookie';
import useLogin from '../../hooks/useLogin';
import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Header() {
  const nickName = Cookies.get('nickName');
  const isLogin = useLogin();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogOut = () => {
    setIsModalOpen(false);
    Cookies.remove('access_token', { path: '' });
    Cookies.remove('refresh_token', { path: '' });
    Cookies.remove('nickName', { path: '' });
    router.push('/');
    window.location.reload();
  };

  return (
    <div>
      <HeaderContainer>
        <Logo>
          <Link href={'/'}>
            <Image src="/logo/SAND.svg" width="400" height="250" alt="HOME" />
          </Link>
        </Logo>
        <LogoMobile>
          <Link href={'/'}>
            <Image src="/logo/SAND.svg" width="300" height="180" alt="HOME" />
          </Link>
        </LogoMobile>
        <Menu>
          {
            isLogin ? (
              <>
                <MenuButton onClick={() => router.push('/analysis')}>
                  <Image
                    src="/header/analysis.svg"
                    width="32"
                    height="32"
                    alt="analysis"
                  />
                </MenuButton>
                <MenuButton
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
                  <Image
                    src="/header/new.svg"
                    width="32"
                    height="32"
                    alt="new"
                  />
                </MenuButton>
                <MenuButton onClick={openModalHandler}>
                  <Image
                    src="/header/mypage.svg"
                    width="32"
                    height="32"
                    alt="user"
                  />
                </MenuButton>
                {/* <NewDiaryBtn
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
                </NewDiaryBtn> */}

                {/* <ProfileBtn onClick={openModalHandler}>
                  {nickName ? nickName[0].toUpperCase() : `🦄`}
                </ProfileBtn> */}
              </>
            ) : null
            // <LoginBtn onClick={() => router.push('/login')}>로그인</LoginBtn>
          }
        </Menu>
        {isModalOpen && <ModalBackdrop onClick={openModalHandler} />}
        {isModalOpen ? (
          <ModalBox onClick={(event) => event.stopPropagation()}>
            <ModalMenu
              onClick={() => {
                router.push('/analysis');
                setIsModalOpen(!isModalOpen);
              }}
            >
              분석 페이지
            </ModalMenu>{' '}
            <ModalMenu onClick={handleLogOut}>로그아웃</ModalMenu>
          </ModalBox>
        ) : null}
      </HeaderContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;
  /* background-color: ${({ theme }) => theme.color.lightBrown}; */
  color: ${({ theme }) => theme.color.cream};
  padding: 0 60px;
  z-index: '10';
  position: relative;

  @media screen and (max-width: 672px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0;
  }
`;

const Logo = styled.div`
  padding: 20px 0;

  @media screen and (max-width: 672px) {
    display: none;
  }
`;

const LogoMobile = styled.div`
  display: none;

  @media screen and (max-width: 672px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: 4px solid red; */
  }
`;

const Menu = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 672px) {
    height: 100%;
  }
`;

const LoginBtn = styled(SmallButton)`
  width: 100px;
  border: 2px solid ${({ theme }) => theme.color.cream};
  background-color: ${({ theme }) => theme.color.lightBrown};
  color: ${({ theme }) => theme.color.cream};
`;

const DarkModeBtn = styled.button`
  background-color: inherit;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const MenuButton = styled(SmallButton)`
  background-color: inherit;
  /* background-color: ${({ theme }) => theme.color.lime}; */
  border: none;
  border-radius: 50%;
  margin-left: 10px;
`;

const NewDiaryBtn = styled(SmallButton)`
  font-size: 18px;
`;

const ProfileBtn = styled.button`
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 100%;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.pink};
  font-size: 18px;
  font-weight: 600;
  margin-left: 14px;
  :hover {
    cursor: pointer;
  }
`;

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0);

  position: fixed; // 화면 전체
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ModalBox = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  border: 2px solid ${({ theme }) => theme.color.hotPink};
  background-color: ${({ theme }) => theme.color.bg};

  width: 180px;
  height: 90px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 130px;
  right: 20px;
  padding: 10px 0;

  @media screen and (max-width: 672px) {
    flex-direction: row;
    width: 55vw;
    height: 50px;
    top: 240px;
    right: 30px;

    padding: 10px 0;
  }
`;

const ModalMenu = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  color: ${({ theme }) => theme.color.hotPink};
`;
