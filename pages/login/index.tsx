import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import { requestLogin } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';
// import useRegexText from '../../hooks/useRegexText';

type LoginFormProps = {
  email: string;
  pw: string;
};

const LoginPage = () => {
  const router = useRouter();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormProps>();

  // 비번 보이기 / 숨기기
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // Enter 시 로그인
  const handleKeyPress = (e: { type: string; code: string }) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSubmit(onSubmit)();
      setShowPassword((prev) => !prev);
    }
  };

  const handleEmailKeyPress = (e: { type: string; code: string }) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      setShowPassword((prev) => !prev);
    }
  };

  // 유효성 검사
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // 로그인 요청
  const onSubmit: SubmitHandler<LoginFormProps> = (form) => {
    console.log(form);
    // requestLogin(form).then((res) => {
    //   res?.headers?.authorization &&
    //     Cookies.set('access_token', res.headers.authorization, {
    //       expires: 0.079,
    //     });
    //   Cookies.set('refresh_token', res.headers.refresh, { expires: 20 });
    //   router.push('/');
    // });
  };

  return (
    <LoginLayout>
      <Box>
        <Title>Sentimental Diary</Title>
        {/* <Description>로그인 하고 어쩌구 아무튼 멋진 슬로건</Description> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputSet>
            {/* <Label htmlFor="email">Email</Label> */}
            <Input
              id="email"
              placeholder="Email"
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
            {/* <Label htmlFor="pw">Password</Label> */}
            <InputContainer>
              <Input
                id="pw"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
            <LogInBtn type="submit" value={'Log In'} />
            <Button color={'#FDFBE8'} onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </ButtonContainer>
        </Form>
      </Box>
    </LoginLayout>
  );
};

export default LoginPage;

const LoginLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 700px;
  margin: 120px auto;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};
`;

const Title = styled.p`
  color: ${({ theme }) => theme.color.brown};
  margin-bottom: 60px;
  font-size: 32px;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.color.brown};
  margin-bottom: 60px;
  font-size: 20px;
  font-weight: 400;
`;

const Form = styled.form``;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.brown};
  margin-bottom: 30px;
`;

// const Label = styled.label`
//   font-weight: 400;
//   font-size: 18px;
//   padding: 10px;
// `;

const Input = styled.input`
  width: 450px;
  height: 70px;
  padding: 12px;
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
  right: 28px;
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
`;
