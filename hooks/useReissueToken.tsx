import Cookies from 'js-cookie';

import { requestReissueToken } from '../api/users';

// access token 재발급 hook
export const useReissueToken = () => {
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  // 모두 만료 시 : 로그인 페이지로 이동
  // if (accessToken === undefined && refreshToken === undefined) {
  //   router.push('/login');
  // }
  // 엑세스 토큰 만료, 리프레쉬 토큰 O
  if (accessToken === undefined && refreshToken) {
    requestReissueToken() // 헤더에 리프레쉬 토큰을 담아 api/reissue로 GET req
      .then((res) => {
        // 받아온 엑세스 토큰 쿠키에 저장
        res.headers.authorization &&
          Cookies.set('access_token', res.headers.authorization, {
            expires: 0.079,
          });
        // 리프레시 토큰 만료 예상시 리프레시 토큰도 같이 응답으로 오므로 쿠키에 저장
        res.headers.refresh &&
          Cookies.set('refresh_token', res.headers.refresh, { expires: 20 });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
