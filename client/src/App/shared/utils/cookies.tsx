import Cookies from 'js-cookie';

const COOKIE_EXPIRATION_TIME = 1; // 1 day

export const setCookiesForUserData = (userData: any) => {
  Cookies.set('userData', JSON.stringify(userData), { expires: COOKIE_EXPIRATION_TIME });
};

export const getCookiesForUserData = () => {
  const userData = Cookies.get('userData');
  if (userData) return JSON.parse(userData);
  return null;
};
