import styled from 'styled-components';
import Link from 'next/link';
import SmallButton from '../button/SmallButton';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  return (
    <div>
      <HeaderContainer>
        <LogoAndTitle> Sentiment Analysis Diary</LogoAndTitle>
        <Menu>
          <Btn>
            <Image
              src="darkmode/sun_cream.svg"
              width="30"
              height="30"
              alt="not show password"
            />
          </Btn>
          <SmallButton onClick={() => router.push('/addnew')}>
            새 일기 쓰기
          </SmallButton>
          <ProfileBtn>P</ProfileBtn>
        </Menu>
      </HeaderContainer>
    </div>
  );
}

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   z-index: '10';

//   width: 90vw;
//   height: 70px;
//   padding: 30px;
//   background: ${({ theme }) => theme.color.cream};
//   border: 4px solid ${({ theme }) => theme.color.brown};
//   box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
//   border-radius: 24px;
//   font-weight: 500;

//   color: ${({ theme }) => theme.color.brown};
//   margin: 10px;
// `;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.color.lightBrown};
  color: ${({ theme }) => theme.color.cream};
  padding: 50px;
  z-index: '10';
`;

const LogoAndTitle = styled.div`
  font-size: 28px;
`;

const Menu = styled.span`
  width: 220px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  :hover {
    cursor: pointer;
  }
`;

const Btn = styled.button`
  background-color: inherit;
  border: none;
  :hover {
    cursor: pointer;
  }
`;
