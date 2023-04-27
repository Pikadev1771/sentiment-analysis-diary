import axios from 'axios';
import Cookies from 'js-cookie';

const REQUEST_URL =
  'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

type DiaryProps = {
  title: string;
  content: string;
  createdAt: string;
};

// 일기 생성
export const createDiary = (form: DiaryProps) => {
  return axios.post(`${REQUEST_URL}/api/diary`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

// id별 일기 데이터 가져오기
export const getDiaryById = async (id: number | string) => {
  const res = await axios.get(`${REQUEST_URL}/api/diary/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });

  return res.data;
};

// 날짜별 일기 데이터 가져오기
export const getDiaryByDate = async (date: string) => {
  const res = await axios.get(
    `${REQUEST_URL}/api/diary/date?createdAt=${date}`,
    {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    }
  );

  return res.data;
};

// 수정하기
export function editDiary(id: number, form: any) {
  return axios.patch(`${REQUEST_URL}/api/diary/${id}`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}

// 삭제하기
export function deleteDiary(id: number) {
  return axios.delete(`${REQUEST_URL}/api/diary/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
