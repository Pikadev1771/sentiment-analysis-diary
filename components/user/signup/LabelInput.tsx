import styled from 'styled-components';
import { LabelInputType } from '../../../pages/signup';
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
const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #625151;
  max-width: 300px;
  margin: auto;
  margin-bottom: 15px;
`;
const Label = styled.label`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 5px;
`;
const ValidationMessage = styled.strong`
  font-weight: 400;
  color: #ff0000;
  font-size: 16px;
  margin-top: 22px;
`;

const LabelInput = ({ LabelInputList }: LabelInputType) => {
  return (
    <LabelInputContainer>
      <Label id={LabelInputList.label}>{LabelInputList.label}</Label>
      <Input
        name={LabelInputList.label}
        placeholder={LabelInputList.placeholder}
      ></Input>
      <ValidationMessage>{LabelInputList.errorMessage}</ValidationMessage>
    </LabelInputContainer>
  );
};

export default LabelInput;
