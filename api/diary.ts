import axios from 'axios';
import Cookies from 'js-cookie';

// const REQUEST_URL =
//   'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

const REQUEST_URL = 'https://sentiment-diary.store';

type DiaryProps = {
  title: string;
  content: string;
  createdAt: string;
};

// 일기 생성
export const createDiary = (form: DiaryProps) => {
  console.log('✅✅✅✅✅ createDiary 실행!!');
  return axios.post(`${REQUEST_URL}/api/diary`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

// id별 일기 데이터 가져오기 (Server Side / token 필요 X)
export const getDiaryById = async (id: number | string) => {
  const res = await axios.get(`${REQUEST_URL}/api/diary/${id}`);

  return res.data;
};

// 날짜별 일기 데이터 가져오기 (Client Side)
export const getDiaryByDate = async (date: string) => {
  return axios.get(`${REQUEST_URL}/api/diary/date?createdAt=${date}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

// 유저별 일기 데이터 가져오기
export const getDiaryByUser = async () => {
  return axios.get(`${REQUEST_URL}/api/diary?page=1&size=10`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
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
export function deleteDiary(id: number | undefined) {
  return axios.delete(`${REQUEST_URL}/api/diary/${id}`, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
}
