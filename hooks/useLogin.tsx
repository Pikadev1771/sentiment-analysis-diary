import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

export default function useLogin() {
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  useEffect(() => {
    if (refreshToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken, refreshToken]);

  return isLogin;
}
