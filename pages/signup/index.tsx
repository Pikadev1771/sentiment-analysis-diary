import LabelInput from '../../components/user/signup/LabelInput';
import styled from 'styled-components';
export interface LabelInputType {
  LabelInputList: { label: string; placeholder: string; errorMessage: string };
}
const LabelInputLists: LabelInputType['LabelInputList'][] = [
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
  {
    label: 'Password 확인',
    placeholder: 'Password을 입력해주세요',
    errorMessage: '비밀번호가 일치하지 않습니다.',
  },
];
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;
const index = () => {
  return (
    <FormContainer>
      {LabelInputLists.map((LabelInputList) => (
        <LabelInput LabelInputList={LabelInputList} />
      ))}
    </FormContainer>
  );
};

export default index;
