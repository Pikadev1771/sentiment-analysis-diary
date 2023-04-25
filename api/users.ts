import axios from 'axios';

const REQUEST_URL =
  'http://ec2-43-200-210-186.ap-northeast-2.compute.amazonaws.com:8080';

type SignUpFormProps = {
  email: string;
  pw: string;
  pwConfirm: string;
};

type LogInFormProps = {
  email: string;
  pw: string;
};

export const requestSignup = (form: SignUpFormProps) => {
  return axios.post(`${REQUEST_URL}/api/members`, form);
};

export const requestLogin = (form: LogInFormProps) => {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
};

export const checkEmail = (emailForm: object) => {
  return axios.post(`${REQUEST_URL}/api/members/check`, emailForm);
};
