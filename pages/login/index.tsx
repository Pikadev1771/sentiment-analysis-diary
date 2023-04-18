import styled from 'styled-components';
import Button from '../../components/button/Button';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Cookies from 'js-cookie';
import { requestLogin } from '../../api/users';
import { useState } from 'react';
import Image from 'next/image';

type LoginFormProps = {
  email: string;
  pw: string;
};

const LoginPage = () => {
  const router = useRouter();

  const [showPw, setShowPw] = useState(false);

  const handleShowPw = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowPw((prev) => !prev);
  };

  // Enter 시 로그인
  const handleKeyPress = (e: { type: string; code: string }) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      onSubmit(watch());
      setShowPw((prev) => !prev);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormProps>();

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
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputSet>
          <Label id={'email'}>{'Email'}</Label>
          <Input
            placeholder={'Email을 입력해주세요'}
            {...register('email', { required: true })}
          />
          {/* <HelpMessage>{''}</HelpMessage> */}
          <ErrorMessage>{'올바른 이메일 주소를 입력해주세요'}</ErrorMessage>
        </InputSet>

        <InputSet>
          <Label id={'pw'}>{'Password'}</Label>
          <InputContainer>
            <Input
              type={showPw ? 'text' : 'password'}
              placeholder={'Password를 입력해주세요'}
              onKeyPress={handleKeyPress}
              {...register('pw', { required: true })}
            />
            <EyeBtn onClick={handleShowPw}>
              {showPw ? (
                <Image
                  src="password/closedeye.svg"
                  width="20"
                  height="20"
                  alt="not show password"
                />
              ) : (
                <Image
                  src="password/eye.svg"
                  width="20"
                  height="20"
                  alt="show password"
                />
              )}
            </EyeBtn>
          </InputContainer>
          {/* <HelpMessage>{''}</HelpMessage> */}
          <ErrorMessage>{'올바른 이메일 주소를 입력해주세요'}</ErrorMessage>
        </InputSet>

        <ButtonContainer>
          <LogInBtn type="submit" value={'Log In'} />
          <Button color={'#FDFBE8'} onClick={() => router.push('/signup')}>
            Sign Up
          </Button>
        </ButtonContainer>
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  margin: 150px auto;
  border: 3px solid ${({ theme }) => theme.color.brown};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const LogInBtn = styled.input`
  width: 200px;
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

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.brown};
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 18px;
  padding: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
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

const HelpMessage = styled.strong`
  font-weight: 400;
  color: ${({ theme }) => theme.color.brown};
  font-size: 16px;
  padding: 14px 0 4px 10px;
`;
const ErrorMessage = styled(HelpMessage)`
  color: ${({ theme }) => theme.color.red};
`;

const InputContainer = styled.div`
  position: relative;
`;
const EyeBtn = styled.button`
  width: 36px;
  height: 36px;
  background-color: inherit;
  border: none;
  position: absolute;
  top: 8px;
  right: 12px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    background-color: #efeeee;
  }
`;
