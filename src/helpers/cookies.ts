/* eslint-disable import/no-cycle */
import { setCookies } from 'state/loginInfoSlice';
import { store } from 'state/store';
import { isUserCookies } from './typePredicates';

export function CookiesToObj(): Record<string, string> {
  const cookies = window.electron.cookies.get();
  const params: Record<string, string> = {};
  cookies.forEach((cookie) => {
    params[cookie.name] = cookie.value;
  });
  return params;
}

export function initCookies() {
  const cookies = CookiesToObj();
  if (isUserCookies(cookies)) {
    store.dispatch(setCookies(cookies));
  }
}
