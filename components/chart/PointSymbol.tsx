import React from 'react';
import Happy from '../../public/emotion/happy.svg';

type PointSymbolProps = {
  size: number;
  color: string;
  borderWidth: number;
  borderColor: string;
};
const PointSymbol = ({
  size,
  color,
  borderWidth,
  borderColor,
}: // point,
PointSymbolProps) => {
  return (
    <g>
      {/* <Happy width="30" height="30" x="-15" y="-15" /> */}
      <circle
        fill="#FFD0AB"
        r={size}
        strokeWidth={borderWidth}
        stroke={borderColor}
      />
      <circle
        r={size / 4}
        strokeWidth={borderWidth}
        stroke={borderColor}
        fill={color}
        fillOpacity={0.35}
      />
    </g>
  );
};

export default PointSymbol;
