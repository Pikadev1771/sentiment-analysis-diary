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
  position: 'fixed';
  display: flex;
  justify-content: center;
  align-items: center;
  width: '100%';
  height: 5rem;
  bottom: '0';
  background-color: #79685f;
  z-index: '10';
`;

const FooterText = styled.p`
  text-align: center;
  color: #fdfbe9;
  line-height: 1.4;
`;
