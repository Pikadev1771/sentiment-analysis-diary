import styled from 'styled-components';
import { InputType } from '../../../pages/login';

const LoginInput = ({ loginInput }: InputType) => {
  return (
    <Container>
      <Label id={loginInput.label}>{loginInput.label}</Label>
      <Input
        name={loginInput.label}
        placeholder={loginInput.placeholder}
      ></Input>
      <ValidationMessage>{loginInput.errorMessage}</ValidationMessage>
    </Container>
  );
};

export default LoginInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #625151;
  max-width: 300px;
  margin: auto;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 6px solid #625151;
  box-shadow: 10px 10px 4px 10px #625151;
  border-radius: 30px;
  width: 300px;
  height: 50px;
  border-radius: 30px;
  background: #fdfbe9;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */
  color: #625151;
`;

const ValidationMessage = styled.strong`
  font-weight: 400;
  color: #ff0000;
  font-size: 16px;
  margin-top: 22px;
`;
