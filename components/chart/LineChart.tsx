import { ResponsiveLine } from '@nivo/line';

import styled from 'styled-components';
import PointSymbol from './PointSymbol';

import { keyframes } from 'styled-components';

const LineChart = ({ data }: any) => {
  return (
    <LineChartContainer>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        pointSymbol={PointSymbol}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        lineWidth={6}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   orient: 'bottom',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'transportation',
        //   legendOffset: 36,
        //   legendPosition: 'middle',
        // }}
        // axisLeft={{
        //   orient: 'left',
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'count',
        //   legendOffset: -40,
        //   legendPosition: 'middle',
        // }}
      />
    </LineChartContainer>
  );
};
export default LineChart;

const boxMove = keyframes`
0%{
  transform : rotate(0deg)
}50% {
  transform : rotate(180deg)
}100% {
  transform : rotate(360deg)
  }
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 70%;
  padding: 20px;
  /* border: 4px solid green; */
  animation: ${boxMove} 2s0;
`;
