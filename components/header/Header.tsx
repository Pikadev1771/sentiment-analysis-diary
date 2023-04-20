import styled from 'styled-components';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <HeaderContainer>
        <LogoAndTitle>Sentiment Diary</LogoAndTitle>
        <Menu>
          <Link href="/login">로그인</Link>
        </Menu>
      </HeaderContainer>
    </div>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: '10';

  width: 400px;
  height: 70px;
  padding: 30px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 24px;
  font-weight: 500;

  color: ${({ theme }) => theme.color.brown};
  margin: 10px;
`;

const LogoAndTitle = styled.div`
  font-size: 32px;
`;

const Menu = styled.span`
  font-size: 24px;
`;
