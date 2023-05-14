import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { requestSignup, checkEmailDuplication } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';

import type { ReactElement } from 'react';
import Layout from '../../components/layout/Layout';
import type { NextPageWithLayout } from '../_app';
import HomeButton from '../../components/button/HomeButton';
import Head from 'next/head';

type SignUpFormProps = {
  email: string;
  nickName: string;
  pw: string;
  pwConfirm: string;
};

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();

  // react-hook-form
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormProps>({ mode: 'onChange' });

  // 비번 보이기 / 숨기기
  const [showPassword, setShowPassword] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const handleShowPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleShowPwConfirm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPwConfirm((prev) => !prev);
  };

  // Email input 엔터 시 비번 보이기 방지
  // const handleEmailKeyPress = (e: { type: string; code: string }) => {
  //   if (e.type === 'keypress' && e.code === 'Enter') {
  //     setShowPassword((prev) => !prev);
  //   }
  // };

  // 유효성 검사
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const nickNameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 이메일 중복 검사
  type EmailDuplicationCheckMessageType = 'failed' | 'passed' | 'check me';

  const [emailDuplicationCheckMessage, setEmailDuplicationCheckMessage] =
    useState<EmailDuplicationCheckMessageType>('check me');

  const handleEmailDuplicationCheck = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailForm = { email: watch('email') };

    try {
      await checkEmailDuplication(emailForm).then((res) => {
        if (res.data) {
          setEmailDuplicationCheckMessage('passed');
        }
      });
    } catch (error: any) {
      if (error?.response?.data?.status === 419) {
        setEmailDuplicationCheckMessage('failed');
      }
    }
  };

  // 회원가입 요청
  const onSubmit: SubmitHandler<SignUpFormProps> = (form) => {
    requestSignup(form).then((res) => {
      router.push('/');
    });
  };

  return (
    <>
      <Head>
        <title>Sign Up - Sentiment Analysis Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupLayout>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HomeButton />
          <InputSet>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="이메일을 입력해 주세요"
              {...register('email', {
                required: true,
                pattern: emailRegex,
              })}
            />

            {errors?.email?.type === 'required' && (
              <ErrorMessage>이메일을 입력해주세요</ErrorMessage>
            )}
            {errors?.email?.type === 'pattern' && (
              <ErrorMessage>이메일 양식에 맞게 입력해주세요</ErrorMessage>
            )}

            <DuplicationCheckContainer>
              <DuplicationCheckMessage>
                {emailDuplicationCheckMessage === 'check me' && (
                  <p className="check me">중복 확인 해주세요</p>
                )}
                {emailDuplicationCheckMessage === 'failed' && (
                  <p className="failed">이미 존재하는 이메일입니다</p>
                )}
                {emailDuplicationCheckMessage === 'passed' && (
                  <p className="passed">사용 가능한 이메일입니다</p>
                )}
              </DuplicationCheckMessage>
              <DuplicationCheckBtn
                disabled={
                  !errors?.email && watch('email')?.length > 0 ? false : true
                }
                onClick={handleEmailDuplicationCheck}
              >
                이메일 중복 확인
              </DuplicationCheckBtn>
            </DuplicationCheckContainer>
          </InputSet>
          <InputSet>
            <Label htmlFor="nickName">Nickname</Label>
            <Input
              id="nickName"
              placeholder="닉네임을 입력해 주세요"
              {...register('nickName', {
                required: true,
                pattern: nickNameRegex,
              })}
            />

            {errors?.nickName?.type === 'required' && (
              <ErrorMessage>닉네임을 입력해주세요</ErrorMessage>
            )}
            {errors?.nickName?.type === 'pattern' && (
              <ErrorMessage>
                2자 이상 16자 이하, 영어, 숫자 또는 한글로 구성되어야 합니다.
              </ErrorMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pw">Password</Label>
            <InputContainer>
              <Input
                id="pw"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해 주세요"
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
              <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>
            )}

            {errors?.pw?.type === 'pattern' && (
              <ErrorMessage>
                소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이어야 합니다.
              </ErrorMessage>
            )}
          </InputSet>
          <InputSet>
            <Label htmlFor="pwConfirm">Password Confirm</Label>
            <InputContainer>
              <Input
                id="pwConfirm"
                type={showPwConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                {...register('pwConfirm', {
                  required: true,
                  validate: (value: string) => {
                    const password = watch('pw');
                    return password === value;
                  },
                })}
              />
              <EyeBtn onClick={handleShowPwConfirm}>
                {showPwConfirm ? (
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

            {errors?.pwConfirm?.type === 'required' && (
              <ErrorMessage>비밀번호를 한 번 더 입력해주세요</ErrorMessage>
            )}

            {errors?.pwConfirm?.type === 'validate' && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
          </InputSet>
          <ButtonContainer>
            <LogInBtn type="submit" value={'Sign Up'} />
            <GoLogin>
              이미 가입한 회원이신가요?
              <LinkBtn onClick={() => router.push('/login')}>Log in</LinkBtn>
            </GoLogin>
          </ButtonContainer>
        </Form>
      </SignupLayout>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SignUpPage;

const SignupLayout = styled.div`
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
  height: 1200px;
  margin: 0 auto;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.brown};
  margin-bottom: 20px;
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
  margin-bottom: 14px;
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
`;

const ErrorMessage = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding-left: 10px;
`;

const DuplicationCheckContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  margin-top: 8px;
`;

const DuplicationCheckMessage = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.color.brown};

  .failed {
    color: ${({ theme }) => theme.color.red};
  }

  .passed {
    color: ${({ theme }) => theme.color.blue};
  }
`;

const DuplicationCheckBtn = styled.button`
  width: 140px;
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

  :disabled {
    border: 2px solid #b1b0b0;
    border-radius: 10px;
    color: #b1b0b0;
    background-color: #e8e6e6;
  }
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
  margin-top: 20px;
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
`;

const GoLogin = styled.div`
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
