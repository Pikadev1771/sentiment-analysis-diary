import axios from 'axios';
import Cookies from 'js-cookie';

// const REQUEST_URL =
//   'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

const REQUEST_URL = 'https://sentiment-diary.store';

type SignUpFormProps = {
  email: string;
  pw: string;
  pwConfirm: string;
};

type LogInFormProps = {
  email: string;
  pw: string;
};

type EmailFormProps = {
  email: string;
};

// 회원가입
export const requestSignup = (form: SignUpFormProps) => {
  return axios.post(`${REQUEST_URL}/api/members`, form);
};

// 로그인
export const requestLogin = (form: LogInFormProps) => {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
};

// 이메일 중복체크
export const checkEmailDuplication = (emailForm: EmailFormProps) => {
  return axios.post(`${REQUEST_URL}/api/members/check`, emailForm);
};

// 로그아웃
// export const requestLogout = () => {
//   return axios.delete(`${REQUEST_URL}/api/deleteRefreshToken`, {
//     headers: {
//       Refresh: Cookies.get('refresh_token'),
//     },
//   });
// };
