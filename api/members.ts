import axios from 'axios';

const REQUEST_URL = 'https://ngether.site';

type LogInFormProps = {
  email: string;
  pw: string;
};

export const requestLogin = (form: LogInFormProps) => {
  return axios.post(`${REQUEST_URL}/auth/login`, form);
};
