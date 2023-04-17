import styled from 'styled-components';

import Button from '../../components/button/Button';

import InputSet from '../../components/user/InputSet';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const handleLogin = () => {
    console.log('로그인');
  };

  const router = useRouter();
  return (
    <SignUpContainer>
      <FormContainer>
        <InputSet
          label={'Email'}
          placeholder={'Email을 입력해주세요'}
          helpMessage={''}
          errorMessage={'올바른 이메일 주소를 입력해주세요'}
        />
        <InputSet
          label={'Password'}
          placeholder={'Password를 입력해주세요'}
          helpMessage={''}
          errorMessage={'6~12자, 영문, 숫자, 특수문자'}
        />
        <InputSet
          label={'Password 확인'}
          placeholder={'Password를 한 번 더 입력해주세요'}
          helpMessage={''}
          errorMessage={'Password가 일치하지 않습니다.'}
        />

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
