import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import { requestLogin } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';
import SmallButton from '../button/SmallButton';
// import useRegexText from '../../hooks/useRegexText';

const MobileGoLogin = () => {
  const router = useRouter();

  return (
    <Box>
      <LoginBtn onClick={() => router.push('/login')}>Log In</LoginBtn>
      <SignupBtn onClick={() => router.push('/signup')}>Sign Up</SignupBtn>
    </Box>
  );
};

export default MobileGoLogin;

const Box = styled.div`
  display: none;

  @media screen and (max-width: 672px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
  }
`;

const LoginBtn = styled(SmallButton)`
  width: 120px;
  height: 50px;
  padding: 10px 0;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.lime};
  font-size: 18px;
  font-weight: 400;
`;

const SignupBtn = styled(LoginBtn)`
  background-color: ${({ theme }) => theme.color.pink};
`;
