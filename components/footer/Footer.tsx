import styled from 'styled-components';

export default function Footer() {
  return (
    <div>
      <FooterContainer>
        <FooterText>
          © 2023 All Rights Reserved
          <br />
          BE : 신우경 최지현 FE : 김형진 박경현
        </FooterText>
      </FooterContainer>
    </div>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100px;
  background-color: ${({ theme }) => theme.color.lightBrown};
  z-index: '10';
`;
const FooterText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.cream};
  line-height: 1.6;
`;
