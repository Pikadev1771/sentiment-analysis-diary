import { ResponsiveLine } from '@nivo/line';

import styled from 'styled-components';
import PointSymbol from './PointSymbol';

import { keyframes } from 'styled-components';
import SmallButton from '../button/SmallButton';
import Happy from '../../public/emotion/happy.svg';
import Good from '../../public/emotion/good.svg';
import Soso from '../../public/emotion/soso.svg';
import Bad from '../../public/emotion/bad.svg';
import Depressed from '../../public/emotion/depressed.svg';
import { useRouter } from 'next/router';

const lineChartTheme = {
  fontSize: 20,
  textColor: '#7d7a9a', // 축
  grid: {
    line: {
      stroke: '#8ED3C7', // 배경 그리드
      strokeWidth: 1,
    },
  },
};

const LineChart = ({ data }: any) => {
  const router = useRouter();

  const customTooltip = ({ point }: any) => {
    let mood;
    if (point.data.y > 6) mood = 'Happy';
    if (point.data.y > 2 && point.data.y <= 6) mood = 'Good';
    if (point.data.y > -2 && point.data.y <= 2) mood = 'Soso';
    if (point.data.y > -6 && point.data.y <= -2) mood = 'Bad';
    if (point.data.y >= -10 && point.data.y <= -6) mood = 'Depressed';

    return (
      <SmallButton>
        {mood === 'Happy' && <Happy width="26" height="26" />}
        {mood === 'Good' && <Good width="26" height="26" />}
        {mood === 'Soso' && <Soso width="26" height="26" />}
        {mood === 'Bad' && <Bad width="26" height="26" />}
        {mood === 'Depressed' && <Depressed width="26" height="26" />}
        {/* <div>Date: {point.data.x}</div>
        <div>Score: {point.data.y}</div> */}
        <div>Mood: {mood}</div>
      </SmallButton>
    );
  };

  const handleClick = (point: any) => {
    console.log(point);
    router.push(`/diary/${point.data.x}`);
  };

  return (
    <LineChartContainer>
      <ResponsiveLine
        data={data}
        theme={lineChartTheme}
        onClick={handleClick}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        layers={[
          'grid', // 그래프 선
          'markers',
          'axes', // 축 좌표
          'crosshair', // 호버 시 점선
          'lines', // 차트 선
          'points', // 포인트
          'mesh', // 호버 시 나오는 창
        ]}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: -10,
          max: 10,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        useMesh={true}
        curve={'monotoneX'}
        colors={'#7d7a9a'}
        lineWidth={4}
        // pointSymbol={PointSymbol}
        pointSize={16}
        pointColor={'#FDFBE8'}
        pointBorderWidth={4}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        tooltip={customTooltip}
        markers={[
          // 0점 축
          {
            axis: 'y',
            lineStyle: {
              stroke: '#8ED3C7',
              strokeWidth: 3,
            },
            value: 0,
          },
        ]}
        axisBottom={{
          tickSize: 10,
          tickPadding: 10,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 20,
          tickRotation: 0,
        }}
      />
    </LineChartContainer>
  );
};
export default LineChart;

const boxFade = keyframes`
0% {
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 35%;
  padding: 20px;
  animation: ${boxFade} 2s 0s;
`;
