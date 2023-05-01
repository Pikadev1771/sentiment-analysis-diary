import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const BubbleChartTheme = {
  fontSize: 20,
  textColor: '#79685f',
  grid: {
    line: {
      stroke: '#FFD0AB',
      strokeWidth: 1,
    },
  },
};

const BubbleChart = ({ data }) => (
  <BubbleChartContainer>
    <ResponsiveCirclePacking
      theme={BubbleChartTheme}
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="키워드"
      value="횟수"
      valueFormat={(value) => `${value}회`}
      colors={{ scheme: 'set3' }}
      childColor={{
        from: 'color',
        modifiers: [['brighter', 0.4]],
      }}
      padding={0}
      enableLabels={true}
      labelsFilter={function (n) {
        return 2 === n.node.depth;
      }}
      labelsSkipRadius={0}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      borderWidth={4}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.5]],
      }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'none',
          color: 'inherit',
          rotation: -45,
          lineWidth: 5,
          spacing: 8,
        },
      ]}
      fill={[
        {
          match: {
            depth: 1,
          },
          id: 'lines',
        },
      ]}
    />
  </BubbleChartContainer>
);

export default BubbleChart;

const boxFade = keyframes`
0% {
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
`;

const BubbleChartContainer = styled.div`
  width: 100%;
  height: 40%;
  padding: 20px;
  /* border: 4px solid green; */
  animation: ${boxFade} 2s 0s;
`;
