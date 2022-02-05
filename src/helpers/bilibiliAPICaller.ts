import produce from 'immer';
import { QRConfirmFail, QRConfirmSuccess } from 'types/qrConfirm';
import { UserCookies, UserCookiesFromQuery } from 'types/userInfo';
import { deepFreeze } from './object';
import { bilibiliAPI, USER_AGENT } from './constants';
import {
  assertIsQRCodeResponse,
  isQRConfirmFail,
  isQRConfirmSuccess,
} from './typePredicates';

const GET_OPTION: Readonly<RequestInit> = deepFreeze({
  credentials: 'include',
  headers: { 'user-agent': USER_AGENT },
});

const POST_OPTION: Readonly<RequestInit> = deepFreeze({
  credentials: 'include',
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'user-agent': USER_AGENT,
  },
});

export const getQRCode = async (): Promise<string> => {
  const response = await (
    await fetch(bilibiliAPI.QRCODE_REQUEST, GET_OPTION)
  ).json();
  assertIsQRCodeResponse(response);
  return response.data.oauthKey;
};

export const QRCodeLogin = async (
  oauthKey: string
): Promise<QRConfirmSuccess | QRConfirmFail> => {
  const response = await (
    await fetch(
      bilibiliAPI.QRCODE_FINAL_LOGIN,
      produce(POST_OPTION, (draft) => {
        draft.body = `oauthKey=${oauthKey}`;
      })
    )
  ).json();
  if (!(isQRConfirmFail(response) || isQRConfirmSuccess(response))) {
    throw new Error('Invalid type for QR Code Login');
  }
  return response;
};

export const convertCookie = (
  cookieText: UserCookiesFromQuery
): UserCookies => {
  const setDate = new Date();
  setDate.setSeconds(setDate.getSeconds() + parseInt(cookieText.Expires, 10));
  return {
    DedeUserID: parseInt(cookieText.DedeUserID, 10),
    DedeUserID__ckMd5: cookieText.DedeUserID__ckMd5,
    Expires: new Date().getTime() + parseInt(cookieText.Expires, 10) * 1000,
    bili_jct: cookieText.bili_jct,
  };
};

export const dummy = 123;
