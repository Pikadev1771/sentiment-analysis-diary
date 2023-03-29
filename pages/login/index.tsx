import LoginlInput from '../../components/user/login/LoginInput';
import styled from 'styled-components';

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
    placeholder: 'Password을 입력해주세요',
    errorMessage: '6~12자, 영문, 숫자, 특수문자',
  },
];

const LoginPage = () => {
  return (
    <LoginContainer>
      <FormContainer>
        {LoginInputList.map((input, idx) => (
          <LoginlInput key={idx} loginInput={input} />
        ))}
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 40vw;
  height: 500px;
  margin: 100px auto;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lime};
`;
