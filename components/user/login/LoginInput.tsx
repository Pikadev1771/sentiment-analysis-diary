import styled from 'styled-components';
import { InputType } from '../../../pages/login';

const LoginInput = ({ loginInput }: InputType) => {
  return (
    <InputContainer>
      <Label id={loginInput.label}>{loginInput.label}</Label>
      <Input
        name={loginInput.label}
        placeholder={loginInput.placeholder}
      ></Input>
      <ValidationMessage>{loginInput.errorMessage}</ValidationMessage>
    </InputContainer>
  );
};

export default LoginInput;

const InputContainer = styled.div`
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
`;

const ValidationMessage = styled.strong`
  font-weight: 400;
  color: ${({ theme }) => theme.color.red};
  font-size: 16px;
  padding: 14px 0 4px 10px;
`;
