/* eslint-disable import/no-cycle */
import { setCookies } from 'state/loginInfoSlice';
import { store } from 'state/store';
import { getUserInfos } from 'state/userInfoSlice';
import { isUserCookies } from './typePredicates';

export function CookiesToObj(): Record<string, string> {
  const cookies = window.electron.cookies.get();
  const params: Record<string, string> = {};
  cookies.forEach((cookie) => {
    params[cookie.name] = cookie.value;
  });
  return params;
}

export function initCookies(): boolean {
  const cookies = CookiesToObj();
  if (isUserCookies(cookies)) {
    store.dispatch(setCookies(cookies));
    return true;
  }
  return false;
}

export function initUserInfo() {
  if (!initCookies()) return;
  store.dispatch(getUserInfos);
}
