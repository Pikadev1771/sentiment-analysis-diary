import styled from 'styled-components';

import Happy from '../../public/emotion/happy.svg';
import Good from '../../public/emotion/good.svg';
import Soso from '../../public/emotion/soso.svg';
import Bad from '../../public/emotion/bad.svg';
import Depressed from '../../public/emotion/depressed.svg';

export default function Loading() {
  return (
    <LoadingIndicator>
      {/* <Emotions>
        <Happy width="30" height="30" />
        <Good width="30" height="30" />
        <Soso width="30" height="30" />
        <Bad width="30" height="30" />
        <Depressed width="30" height="30" />
      </Emotions> */}
      <LoadingMessage>chatGPT가 일기를 분석 중입니다.</LoadingMessage>
      <LoadingMessage>잠시만 기다려 주세요.</LoadingMessage>
    </LoadingIndicator>
  );
}

const LoadingIndicator = styled.div`
  width: 400px;
  height: 400px;

  border: 6px solid ${({ theme }) => theme.color.brown};
  border-radius: 50%;
  margin: 0 auto;

  background-color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.color.lime};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: bounce_frames 0.5s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.5, 0.05, 1, 0.5);
  animation-iteration-count: 4;

  @keyframes bounce_frames {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, 50px, 0);
    }
  }
`;

const Emotions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 240px;
`;
const LoadingMessage = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brown};
`;
