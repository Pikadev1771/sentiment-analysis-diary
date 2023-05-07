import axios from 'axios';
import Cookies from 'js-cookie';

// const REQUEST_URL =
//   'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

const REQUEST_URL = 'https://sentiment-diary.store';

// 기간별 일기 데이터 가져오기
export const getDiaryByTerm = async (startDate: string, endDate: string) => {
  return axios.get(
    `${REQUEST_URL}/api/diary/term?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    }
  );
};
