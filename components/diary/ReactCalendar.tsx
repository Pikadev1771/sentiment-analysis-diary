import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

export default function ReactCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <CalendarContainer>
        <Container>
          <Calendar locale="ko" onChange={onChange} value={value} />
        </Container>
      </CalendarContainer>
    </div>
  );
}

const CalendarContainer = styled.div`
  width: 50vw;
  height: 90vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  border: 1px solid green;
`;
