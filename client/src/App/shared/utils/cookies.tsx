import Cookies from 'js-cookie';
import { DefaultUserState } from './userContext';
import { UserData } from '../types/UserData';

const COOKIE_EXPIRATION_TIME = 1; // 1 day

export const setCookiesForUserData = (userData: UserData) => {
  Cookies.set('userData', JSON.stringify(userData), { expires: COOKIE_EXPIRATION_TIME });
};

export const getCookiesForUserData = () => {
  const userData = Cookies.get('userData');
  if (userData && userData !== "undefined") return JSON.parse(userData);
  return DefaultUserState;
};
