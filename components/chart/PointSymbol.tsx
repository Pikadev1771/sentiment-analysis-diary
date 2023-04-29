import React from 'react';
import Happy from '../../public/emotion/happy.svg';

const PointSymbol = ({ size, color, borderWidth, borderColor }: any) => (
  <g>
    <circle
      fill="#fff"
      r={size * 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    ></circle>
    <Happy width="40" height="40" x="-20" y="-20" />
    {/* 
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    /> */}
  </g>
);

export default PointSymbol;
