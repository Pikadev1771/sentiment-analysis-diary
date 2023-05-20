import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import { requestLogin } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';

import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import type { NextPageWithLayout } from '../_app';
import HomeButton from '../../components/button/HomeButton';
import Head from 'next/head';

type LoginFormProps = {
  email: string;
  pw: string;
};

const LoginPage: NextPageWithLayout = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>();

  const router = useRouter();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormProps>({ mode: 'onChange' });

  // 비번 보이기 / 숨기기
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // Email input 엔터 시 비번 보이기 방지
  const handleEmailKeyPress = (e: {
    type: string;
    code: string;
    preventDefault: () => void;
  }) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
    }
  };

  // Enter 시 로그인
  const handleKeyPress = (e: {
    type: string;
    code: string;
    preventDefault: () => void;
  }) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  // 유효성 검사
  // const emailRegex =
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 로그인 요청
  const onSubmit: SubmitHandler<LoginFormProps> = (form) => {
    requestLogin(form)
      .then((res) => {
        res?.headers?.authorization &&
          Cookies.set('access_token', res.headers.authorization, {
            expires: 0.079,
          });
        Cookies.set('refresh_token', res.headers.refresh, { expires: 20 });
        Cookies.set('nickName', res.data.nickName);
        router.push('/');
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setLoginErrorMessage('정확하지 않은 이메일 또는 패스워드입니다');
        }
      });
  };

  // 구글 로그인 이동
  const handleGoogleLogin = async () => {
    router.push('/google');
  };

  return (
    <>
      <Head>
        <title>Log In - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginLayout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HomeButton />
          <InputSet>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="이메일을 입력해주세요"
              onKeyPress={handleEmailKeyPress}
              {...register('email', {
                required: true,
                pattern: emailRegex,
              })}
            />
            {errors?.email?.type === 'required' && (
              <HelpMessage>이메일을 입력해주세요</HelpMessage>
            )}

            {errors?.email?.type === 'pattern' && (
              <HelpMessage>이메일 양식에 맞게 입력해주세요</HelpMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pw">Password</Label>
            <InputContainer>
              <Input
                id="pw"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                onKeyPress={handleKeyPress}
                {...register('pw', {
                  required: true,
                  pattern: passwordRegex,
                })}
              />
              <EyeBtn onClick={handleShowPassword}>
                {showPassword ? (
                  <Image
                    src="password/closedeye.svg"
                    width="24"
                    height="24"
                    alt="not show password"
                  />
                ) : (
                  <Image
                    src="password/eye.svg"
                    width="24"
                    height="24"
                    alt="show password"
                  />
                )}
              </EyeBtn>
            </InputContainer>
            {errors?.pw?.type === 'required' && (
              <HelpMessage>비밀번호를 입력해주세요</HelpMessage>
            )}

            {errors?.pw?.type === 'pattern' && (
              <HelpMessage>
                소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
              </HelpMessage>
            )}
          </InputSet>
          <ButtonContainer>
            <LoginErrorMessage>{loginErrorMessage}</LoginErrorMessage>
            <LogInBtn type="submit" value={'Log In'} />
            {/* <GoogleLoginBtn onClick={() => handleGoogleLogin()}>
              <Image
                alt="google login"
                src="/login/googleLogin.png"
                layout="fill"
                objectFit="contain"
              />
            </GoogleLoginBtn> */}
            <LinkContainer>
              아직 회원이 아니신가요?
              <LinkBtn color={'#FDFBE8'} onClick={() => router.push('/signup')}>
                Sign Up
              </LinkBtn>
            </LinkContainer>
          </ButtonContainer>
        </Form>
      </LoginLayout>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;

const LoginLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 140px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 780px;
  margin: 0 auto;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};

  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.brown};
  margin-bottom: 10px;
  width: 70%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 18px;
  padding: 10px;
`;

const Input = styled.input`
  width: 450px;
  height: 70px;
  padding: 16px;
  background: ${({ theme }) => theme.color.cream};
  border: 4px solid ${({ theme }) => theme.color.brown};
  box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.brown};

  :focus {
    outline: none;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 14px;
  }
`;

const HelpMessage = styled.label`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding: 12px 0 4px 10px;
`;

const InputContainer = styled.div`
  position: relative;
`;
const EyeBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: inherit;
  border: none;
  position: absolute;
  top: 16px;
  right: 20px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    background-color: #efeeee;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const LoginErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.red};
  margin: 6px 0;
  font-weight: 400;
  font-size: 16px;
`;

const LogInBtn = styled.input`
  width: 450px;
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

  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 16px;
  }
`;

const LinkContainer = styled.div`
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
  background-color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.color.pink};
  font-size: 16px;
  font-weight: 600;
  /* text-decoration: underline; */
  :hover {
    cursor: pointer;
  }
`;

const GoogleLoginBtn = styled.button`
  position: relative;
  border: none;
  width: 280px;
  height: 70px;
  background-color: inherit;
  margin-top: 8px;
  :hover {
    cursor: pointer;
  }
`;
