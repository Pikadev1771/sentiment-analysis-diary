import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Link from 'next/link';

export default function ReactCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <CalendarContainer>
        {/* <Link href="/signup">회원가입</Link>
        <Link href="/login">로그인</Link> */}
        <Container>
          <Calendar
            locale="en"
            onChange={onChange}
            value={value}
            formatDay={(locale, date) =>
              date.toLocaleString('en', { day: 'numeric' })
            }
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
          />
        </Container>
      </CalendarContainer>
    </div>
  );
}

const CalendarContainer = styled.div`
  width: 40vw;
  height: 90vh;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border: 1px solid green;

  .react-calendar {
    width: 550px;
    height: 500px;
    background: ${({ theme }) => theme.color.cream};
    border: 4px solid ${({ theme }) => theme.color.brown};
    box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
    border-radius: 24px;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.color.brown};
  }

  // 상단 년, 월
  .react-calendar__navigation {
    background: ${({ theme }) => theme.color.pink};
    border-bottom: 4px solid ${({ theme }) => theme.color.brown};
    height: 90px;
    border-radius: 20px 20px 0 0;

    span {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.brown};
    }
  }

  // 월 달력
  .react-calendar__month-view {
    padding: 12px 32px;
    abbr {
      // 텍스트
      color: ${({ theme }) => theme.color.brown};
      font-size: 16px;
      font-weight: 500;
    }
  }

  // 요일
  .react-calendar__month-view__weekdays {
    abbr {
      // 텍스트
      font-size: 18px;
      font-weight: 900;
    }
  }

  // 일
  .react-calendar__tile {
    text-align: center;
    height: 60px;
  }

  // 오늘
  .react-calendar__tile--now {
    background: ${({ theme }) => theme.color.lime};

    border-radius: 14px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #deec85;
    border-radius: 14px;
  }
`;
