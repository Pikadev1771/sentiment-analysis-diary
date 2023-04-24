import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import { requestLogin } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';
// import useRegexText from '../../hooks/useRegexText';

const GoLogin = () => {
  const router = useRouter();

  return (
    <Box>
      <Title>
        <p>로그인하고</p>
        <p>chatGPT와 함께 일기 분석하러 가기</p>
      </Title>
      <ButtonContainer>
        <LogInBtn onClick={() => router.push('/login')}>Log In</LogInBtn>
        <GoToLogin>
          아직 회원이 아니신가요?
          <LinkBtn onClick={() => router.push('/signup')}>Sign Up</LinkBtn>
        </GoToLogin>
      </ButtonContainer>
    </Box>
  );
};

export default GoLogin;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 500px;
  margin: 120px auto;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};
`;

const Title = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.color.brown};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const LogInBtn = styled.button`
  width: 250px;
  height: 70px;
  padding: 10px 0;
  margin: 10px;
  border: 4px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.color.pink};
  font-size: 20px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

const GoToLogin = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.color.brown};
  font-size: 16px;
  margin: 20px auto;
`;

const LinkBtn = styled.button`
  width: 90px;
  height: 30px;
  margin-left: 8px;
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.cream};
  font-size: 16px;
  font-weight: 600;
  /* text-decoration: underline; */
  :hover {
    cursor: pointer;
  }
`;