import styled from 'styled-components';

export default function Footer() {
  return (
    <div>
      <FooterContainer>
        <FooterText>
          <p> © Sentiment Analysis Diary All Rights Reserved 2023 </p>
          <p> BE : 신우경 최지현 FE : 박경현</p>
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
  max-width: 2400px;
  height: 150px;
  z-index: '10';
  margin-top: 10px;
`;
const FooterText = styled.div`
  border-top: 3px solid ${({ theme }) => theme.color.lightBrown};
  width: 90%;
  text-align: center;
  padding: 40px;

  p {
    margin: 8px;
    color: ${({ theme }) => theme.color.lightBrown};
    font-size: 18px;
    font-style: italic;

    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
`;
