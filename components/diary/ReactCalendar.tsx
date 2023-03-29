import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  .react-calendar__tile--now {
    background: #17a1fa;
    color: #ffd9df;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #deec85;
    color: #17a1fa;
  }
`;
