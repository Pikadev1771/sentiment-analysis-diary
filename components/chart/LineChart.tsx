import { ResponsiveLine } from '@nivo/line';

import styled from 'styled-components';
import PointSymbol from './PointSymbol';

import { keyframes } from 'styled-components';
import SmallButton from '../button/SmallButton';
import Happy from '../../public/emotion/happy.svg';

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
  const item = data[0].data;
  console.log(item);
  const emotion = 'happy';

  const customTooltip = ({ point }) => {
    console.log(point);
    return (
      <SmallButton>
        <Happy width="22" height="22" />
        {/* <div>Date: {point.data.x}</div>
        <div>Score: {point.data.y}</div> */}
        <div>Mood: Happy</div>
      </SmallButton>
    );
  };

  return (
    <LineChartContainer>
      <ResponsiveLine
        data={data}
        theme={lineChartTheme}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '-10',
          max: '10',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        // pointSymbol={() => PointSymbol(emotion)}
        pointSize={14}
        pointColor={'#FDFBE8'}
        pointBorderWidth={4}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve={'monotoneX'}
        colors={'#7d7a9a'}
        lineWidth={4}
        layers={[
          'grid', // 그래프 선
          'markers',
          'axes', // 축 좌표
          // 'areas',
          'crosshair', // 호버 시 점선
          'lines', // 차트 선
          'points', // 포인트
          // 'slices',
          'mesh', // 호버 시 나오는 창
          // 'legends', 개요
        ]}
        markers={[
          {
            axis: 'y',
            lineStyle: {
              stroke: '#b0413e',
              strokeWidth: 1,
            },
            value: 0,
          },
        ]}
        tooltip={customTooltip}
        axisBottom={{
          orient: 'bottom',
          tickSize: 10,
          tickPadding: 10,
          tickRotation: 0,

          // legend: 'Date',
          // legendOffset: 40,
          // legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 10,
          tickPadding: 20,
          tickRotation: 0,
          // legend: 'count',
          // legendOffset: -40,
          // legendPosition: 'middle',
        }}

        // legends={[
        //   {
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemBackground: 'rgba(0, 0, 0, .03)',
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
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
  height: 40%;
  padding: 20px;
  /* border: 4px solid green; */
  animation: ${boxFade} 2s 0s;
`;

//  peach: '#FFD0AB',
//     pink: '#FFD9DF',
//     brown: '#625151',
//     lime: '#DEEC85',
//     cream: '#FDFBE8',
//     blue: '#17A1FA',
//     red: '#E73B3B',
//     lightBrown: '#79685f',
