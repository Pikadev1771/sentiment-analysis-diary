import styled from 'styled-components';
import LoginlInput from '../../components/user/login/LoginInput';
import Button from '../../components/button/Button';

import { useRouter } from 'next/router';

export interface InputType {
  loginInput: { label: string; placeholder: string; errorMessage: string };
}
const LoginInputList: InputType['loginInput'][] = [
  {
    label: 'Email',
    placeholder: 'Email을 입력해주세요',
    errorMessage: '올바른 이메일 주소를 입력해주세요',
  },
  {
    label: 'Password',
    placeholder: 'Password를 입력해주세요',
    errorMessage: '6~12자, 영문, 숫자, 특수문자',
  },
  {
    label: 'Password 확인',
    placeholder: 'Password를 한 번 더 입력해주세요',
    errorMessage: '6~12자, 영문, 숫자, 특수문자',
  },
];

const SignUpPage = () => {
  const handleLogin = () => {
    console.log('로그인');
  };

  const router = useRouter();
  return (
    <SignUpContainer>
      <FormContainer>
        {LoginInputList.map((loginInput, idx) => (
          <LoginlInput key={idx} loginInput={loginInput} />
        ))}
        <ButtonContainer>
          <Button color={'#FDFBE8'} onClick={() => router.push('/signup')}>
            Sign Up
          </Button>
        </ButtonContainer>
      </FormContainer>
    </SignUpContainer>
  );
};

export default SignUpPage;

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 600px;
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
