import styled from 'styled-components';
import Link from 'next/link';
import SmallButton from '../button/SmallButton';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import Cookies from 'js-cookie';
import useLogin from '../../hooks/useLogin';
import { useEffect, useState } from 'react';
import { requestLogout } from '../../api/users';
import { useReissueToken } from '../../hooks/useReissueToken';

export default function Header({ handleLogOut }) {
  const nickName = Cookies.get('nickName');
  const isLogin = useLogin();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <HeaderContainer>
        <Link href={'/'}>
          <Image src="/logo/logo_01.svg" width="200" height="60" alt="HOME" />
        </Link>
        <Menu>
          {isLogin ? (
            <>
              <AnalysisButton onClick={() => router.push('/analysis')}>
                <Image
                  src="/darkmode/moon_cream.svg"
                  width="36"
                  height="36"
                  alt="dark mode"
                />
              </AnalysisButton>
              <AnalysisButton onClick={() => router.push('/analysis')}>
                <Image
                  src="/analysis.svg"
                  width="36"
                  height="36"
                  alt="analysis"
                />
              </AnalysisButton>

              <NewDiaryBtn
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
              </NewDiaryBtn>
              <ProfileBtn onClick={openModalHandler}>
                {nickName ? nickName[0].toUpperCase() : `🦄`}
              </ProfileBtn>
            </>
          ) : (
            <LoginBtn onClick={() => router.push('/login')}>로그인</LoginBtn>
          )}
        </Menu>
        {isModalOpen && <ModalBackdrop onClick={openModalHandler} />}
        {isModalOpen ? (
          <ModalBox onClick={(event) => event.stopPropagation()}>
            <ModalMenu onClick={handleLogOut}>로그아웃</ModalMenu>
            <ModalMenu
              onClick={() => {
                router.push('/analysis');
                setIsModalOpen(!isModalOpen);
              }}
            >
              분석 페이지
            </ModalMenu>
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
  height: 100px;
  background-color: ${({ theme }) => theme.color.lightBrown};
  color: ${({ theme }) => theme.color.cream};
  padding: 0 40px;
  z-index: '10';
  position: relative;
`;

const Logo = styled(SmallButton)`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.cream};
  border: none;
  background-color: inherit;
`;

const Menu = styled.div`
  width: 350px;
  font-size: 18x;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

const AnalysisButton = styled(SmallButton)`
  border: none;
  background-color: inherit;
  /* border: 2px solid ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.lime}; */
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
  border: 2px solid ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.cream};

  width: 180px;
  height: 90px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 110px;
  right: 10px;
  padding: 10px 0;
`;

const ModalMenu = styled.button`
  border: none;
  background-color: inherit;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};
`;
