import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const REQUEST_URL = 'https://ngether.site';

export const useReissueToken = () => {
  const router = useRouter();
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  // 모두 만료 시 : 로그인 페이지로 이동
  if (accessToken === undefined && refreshToken === undefined) {
    router.push('/login');
  }
  // 엑세스 토큰 만료, 리프레쉬 토큰 O
  if (accessToken === undefined && refreshToken) {
    axios
      .get(`${REQUEST_URL}/api/reissue`, { headers: { refresh: refreshToken } }) // 헤더에 리프레쉬 토큰을 담아 api/reissue로 GET req
      .then((res) => {
        // 받아온 엑세스 토큰 쿠키에 저장
        res.headers.authorization &&
          Cookies.set('access_token', res.headers.authorization, {
            expires: 0.079,
          });
        // 리프레시 토큰 만료 예상시 리프레시 토큰도 같이 응답으로 오므로 쿠키에 저장
        res.headers.refresh &&
          Cookies.set('refresh', res.headers.refresh, { expires: 20 });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
