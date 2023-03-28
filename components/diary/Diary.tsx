import React from 'react';
import styled from 'styled-components';

export default function Diary() {
  return (
    <div>
      <DiaryContainer></DiaryContainer>
    </div>
  );
}

const DiaryContainer = styled.div`
  width: 50vw;
  height: 90vh;
  border: 1px solid blue;
`;
