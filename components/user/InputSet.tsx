import styled from 'styled-components';

interface InputSetProps {
  label: string;
  placeholder: string;
  helpMessage: string;
  errorMessage: string;
}

const InputSet = ({
  label,
  placeholder,
  helpMessage,
  errorMessage,
}: InputSetProps) => {
  return (
    <InputContainer>
      <Label id={label}>{label}</Label>
      <Input name={label} placeholder={placeholder}></Input>
      {/* <HelpMessage>{helpMessage}</HelpMessage> */}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </InputContainer>
  );
};

export default InputSet;

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

const HelpMessage = styled.strong`
  font-weight: 400;
  color: ${({ theme }) => theme.color.brown};
  font-size: 16px;
  padding: 14px 0 4px 10px;
`;
const ErrorMessage = styled(HelpMessage)`
  color: ${({ theme }) => theme.color.red};
`;
