import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
  return <Btn {...props} />;
};

export default Button;

const Btn = styled.button`
  width: 450px;
  height: 70px;
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
