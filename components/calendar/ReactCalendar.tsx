import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

import Link from 'next/link';
import Image from 'next/image';

export default function ReactCalendar() {
  const [value, onChange] = useState<Date>(new Date());
  const day = moment(value).format('YYYY-MM-DD');
  const curDate = new Date();
  const curDateTime = moment(curDate).format('MM-DD');

  const mark = [
    '2023-03-10',
    '2023-03-21',
    '2023-04-02',
    '2023-04-14',
    '2023-04-27',
  ];

  // 날짜 타일에 컨텐츠 추가
  const addContent = ({ date, view }) => {
    // 해당 날짜에 추가할 컨텐츠 배열
    const contents = [];
    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
    if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <>
          {/* <div className="dot"></div> */}
          <Image
            src="good.svg"
            className="diaryImg"
            width="26"
            height="26"
            alt="로고"
          />
        </>
      );
    }
    return <>{contents}</>;
  };

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
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => moment(date).format('D')}
            // tileDisabled={({ date, view }) =>
            //   moment(date).format('MM-DD') < curDateTime
            // }
            tileContent={addContent}
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
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;

  .react-calendar {
    width: 100%;
    height: 500px;
    background: ${({ theme }) => theme.color.cream};
    border: 4px solid ${({ theme }) => theme.color.brown};
    box-shadow: 6px 6px 0px 0px ${({ theme }) => theme.color.brown};
    border-radius: 24px;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.color.brown};

    .dot {
      height: 8px;
      width: 8px;
      background-color: #63a1ff;
      border-radius: 20px;
      display: flex;
      margin: 2px auto;
    }

    .diaryImg {
      /* border: 2px solid red; */
      padding-top: 4px;
    }
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

  .react-calendar__navigation button:disabled {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.color.pink};
    border-radius: 20px 20px 0 0;
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  // 오늘
  .react-calendar__tile--now {
    background: ${({ theme }) => theme.color.lime};
    border-radius: 14px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.color.blue};
    border-radius: 14px;
  }
`;
