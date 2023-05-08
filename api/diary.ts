import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// const REQUEST_URL =
//   'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

const REQUEST_URL = 'https://sentiment-diary.store';

// const config: AxiosRequestConfig = { baseURL: REQUEST_URL };
// const axiosInstance = axios.create(config);

// // 요청마다 헤더에 access_token 넣어 보냄
// axiosInstance.interceptors.request.use((config) => {
//   const access_token = Cookies.get('access_token');

//   if (access_token) {
//     config.headers.Authorization = access_token;
//   }

//   return config;
// });

// // access_token 재발급 요청
// const reIssueToken = async () => {
//   await axios
//     .get(`${REQUEST_URL}/api/reissue`, {
//       headers: {
//         Refresh: Cookies.get('refresh_token'),
//       },
//     })
//     .then((res) => {
//       // 받아온 엑세스 토큰 쿠키에 저장
//       res.headers.authorization &&
//         Cookies.set('access_token', res.headers.authorization, {
//           expires: 0.079,
//         });
//       // 리프레시 토큰 만료 예상시 리프레시 토큰도 같이 응답으로 오므로 쿠키에 저장
//       res.headers.refresh &&
//         Cookies.set('refresh_token', res.headers.refresh, { expires: 20 });
//     });

//   return Cookies.get('access_token');
// };

// // 응답 시
// axiosInstance.interceptors.response.use(
//   // 정상 응답 처리
//   (response) => {
//     return response;
//   },
//   // 오류 발생시
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 401) {
//       const new_access_token = await reIssueToken(); // 재발급 받은 access_token (쿠키에도 저장됨)

//       if (new_access_token) {
//         config.headers.Authorization = new_access_token;
//       }

//       // 원래의 요청으로 다시 요청
//       return axiosInstance(config);
//     }
//     return Promise.reject(error);
//   }
// );

type DiaryProps = {
  title: string;
  content: string;
  createdAt: string;
};

// 일기 생성
// export const createDiary = (form: DiaryProps) =>
//   axiosInstance.post('/api/diary', form);

export const createDiary = (form: DiaryProps) => {
  return axios.post(`${REQUEST_URL}/api/diary`, form, {
    headers: {
      Authorization: Cookies.get('access_token'),
      Refresh: Cookies.get('refresh_token'),
    },
  });
};

// id별 일기 데이터 가져오기 (Server Side / token 필요 X)
export const getDiaryById = async (id: number | string) => {
  const res = await axios.get(`${REQUEST_URL}/api/diary/${id}`, {
    headers: {
      withCredentials: true,
    },
  });

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
