import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';

// 일기 데이터
const diaryData = [
  {
    id: 1,
    date: '2023-04-01',
    title: '야호',
    content: '날씨 좋다~~!',
    score: 1,
    emotion: 'good',
  },
  {
    id: 2,
    date: '2023-04-04',
    title: '메리 크리스마스🎅🏽',
    content: '🎄🎄🎄',
    score: 0.5,
    emotion: 'soso',
  },
  {
    id: 3,
    date: '2023-04-14',
    title: '해피 뉴이어',
    content: '행복한 2023년',
    score: 0.1,
    emotion: 'bad',
  },
  {
    id: 4,
    date: '2023-04-20',
    title: '야호',
    content: '날씨 좋다~~!',
    score: 1,
    emotion: 'happy',
  },
];

export default function ReactCalendar() {
  const router = useRouter();

  const curDate = new Date(); // 오늘 날짜
  const [value, setValue] = useState<Date>(curDate); // 클릭한 날짜
  const activeDate = moment(value).format('YYYY-MM-DD'); // 클릭한 날짜 (년-월-일))
  const monthOfActiveDate = moment(value).format('YYYY-MM'); // 클릭한 날짜의 달(년-월) (맨 처음에는 오늘 날짜의 달))
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate); // 보여지는 달
  console.log(value);

  // 보여지는 달 변경 함수
  const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(newActiveMonth);
  };

  const handleClick = (value: any) => {
    // 클릭한 날짜 변경
    setValue(value);

    if (
      diaryData.find(
        (diary) => diary.date === moment(value).format('YYYY-MM-DD')
      )
    ) {
      router.push('/diary/1');
    } else {
      router.push({
        pathname: '/addnew',
        query: {
          date: moment(value).format('YYYYMMDD'),
        },
      });
    }
  };

  // 각 날짜 타일에 컨텐츠 추가
  const tileContent = ({ date }: any) => {
    // 해당 날짜(하루)의 타일에 추가할 컨텐츠의 배열
    const contents = [];

    // 해당 날짜(하루)의 일기 데이터
    const tileDiary = diaryData.find(
      (diary) => diary.date === moment(date).format('YYYY-MM-DD')
    );

    // 해당 날짜(하루)의 일기 데이터가 존재하면 이모티콘 이미지 추가
    if (tileDiary) {
      contents.push(
        <>
          {/* <div className="dot"></div> */}
          <Image
            src={`emotion/${tileDiary?.emotion}.svg`}
            className="diaryImg"
            width="28"
            height="28"
            alt="today is..."
          />
        </>
      );
    }
    return <div>{contents}</div>;
  };

  const leftArrow = (
    <>
      <Image src="calendar/left.svg" width="18" height="18" alt="previous" />
    </>
  );

  const rightArrow = (
    <>
      <Image src="calendar/right.svg" width="18" height="18" alt="next" />
    </>
  );

  return (
    <div>
      <Container>
        <Calendar
          locale="en"
          onChange={handleClick}
          value={value}
          prevLabel={leftArrow}
          nextLabel={rightArrow}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
          tileContent={tileContent}
          showNeighboringMonth={false}
          onActiveStartDateChange={({ activeStartDate }) =>
            getActiveMonth(activeStartDate)
          }
        />
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 70%;
  margin: 0 auto;

  .react-calendar {
    width: 100%;
    height: 520px;
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

  // 상단 내비게이션(년, 월)
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

  // 월 달력 (내비게이션 제외)
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
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.color.blue};
    border-radius: 14px;
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
