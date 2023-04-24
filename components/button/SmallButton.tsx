import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SmallButton = (props: ButtonProps) => {
  return <SmallBtn {...props} />;
};

export default SmallButton;

const SmallBtn = styled.button`
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.color.brown};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.brown};
  background-color: ${({ theme }) => theme.color.cream};
  font-size: 16px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;
