import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

import { CreateFormProps } from '../components/diaryForm/DiaryForm';
import { EditFormProps } from '../pages/edit/[date]';

// const REQUEST_URL =
//   'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

const REQUEST_URL = 'https://sentiment-diary.store';

const config: AxiosRequestConfig = { baseURL: REQUEST_URL };
const axiosInstance = axios.create(config);

// [요청 설정] 모든 요청의 헤더에 토큰 넣어 보내기
axiosInstance.interceptors.request.use((config) => {
  // if (!config.headers) return config;

  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token');

  if (config.url === '/api/reissue') {
    // 토큰 재발급 요청일 때만  헤더에 refresh_token 넣어서 보내고
    config.headers.Refresh = refresh_token;
  } else {
    // 그 외 요청은 헤더에 access_token 넣어서 보내기
    config.headers.Authorization = access_token;
  }

  return config;
});

// access_token 재발급 요청 (access_token 반환))
const reIssuedToken = async () => {
  try {
    await axiosInstance.get(`/api/reissue`).then((res) => {
      Cookies.set('access_token', res.headers.authorization, {
        expires: 0.079,
      });

      if (res.headers.refresh) {
        Cookies.set('refresh_token', res.headers.refresh, {
          expires: 20,
        });
      }
    });

    return Cookies.get('access_token');
  } catch (e) {
    Cookies.remove('access_token', { path: '' });
    Cookies.remove('refresh_token', { path: '' });
    Cookies.remove('nickName', { path: '' });
    router.push('/login');
  }
};

// [응답 설정]
axiosInstance.interceptors.response.use(
  // 정상 응답 처리
  (response) => {
    return response;
  },
  // 에러 처리
  async (error) => {
    const { config, response } = error;

    // 토큰 자동 재발급 필요 외 다른 에러
    if (
      config.url === `/api/reissue` ||
      response?.status !== 402 ||
      config.sent
    ) {
      return Promise.reject(error);
    }

    config.sent = true;
    const access_token = await reIssuedToken(); // 토큰 재발급 받아서

    if (access_token) {
      config.headers.Authorization = access_token; // 헤더에 넣어서
    }

    return axiosInstance(config); // 다시 요청
  }
);

// 일기 생성
export const createDiary = async (form: CreateFormProps) =>
  axiosInstance.post('/api/diary', form);

// 날짜별 일기 데이터 가져오기 (Client Side)
export const getDiaryByDate = async (date: string) =>
  axiosInstance.get(`/api/diary/date?createdAt=${date}`);

// 유저별 일기 데이터 가져오기
export const getDiaryByUser = async () =>
  axiosInstance.get(`/api/diary?page=1&size=10`);

// 수정하기
export const editDiary = (id: number, form: EditFormProps) =>
  axiosInstance.patch(`/api/diary/${id}`, form);

// 삭제하기
export const deleteDiary = (id: number | undefined) =>
  axiosInstance.delete(`/api/diary/${id}`);

// id별 일기 데이터 가져오기 (Server Side / token 필요 X)
export const getDiaryById = async (id: number | string) => {
  const res = await axios.get(`${REQUEST_URL}/api/diary/${id}`);

  return res.data;
};

// [분석 페이지] 기간별 일기 데이터 가져오기
export const getDiaryByTerm = async (startDate: string, endDate: string) =>
  axiosInstance.get(
    `/api/diary/term?startDate=${startDate}&endDate=${endDate}`
  );
