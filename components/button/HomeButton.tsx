import styled from 'styled-components';
import Image from 'next/image';

const HomeButton = () => {
  return (
    <HomeBtnContainer>
      <HomeBtn color={'#FDFBE8'} onClick={() => router.push('/')}>
        <Image src="home.svg" width="30" height="30" alt="previous" />
        <p>HOME</p>
      </HomeBtn>
    </HomeBtnContainer>
  );
};

export default HomeButton;

const HomeBtnContainer = styled.div`
  margin: 10px 0;
`;

const HomeBtn = styled.button`
  width: 80px;
  height: 80px;
  border: 3.5px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.color.pink};
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};
  font-size: 16px;

  :hover {
    cursor: pointer;
  }
`;
