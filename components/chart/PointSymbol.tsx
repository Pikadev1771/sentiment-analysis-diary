import React from 'react';
import Happy from '../../public/emotion/happy.svg';

const PointSymbol = ({
  size,
  color,
  borderWidth,
  borderColor,
  emotion,
}: any) => (
  <g>
    <Happy width="30" height="30" x="-15" y="-15" />
    {/* <circle
      fill="#FFD0AB"
      r={size * 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    /> */}
  </g>
);

export default PointSymbol;
