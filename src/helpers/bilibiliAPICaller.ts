import produce from 'immer';
import { deepFreeze } from './object';
import { bilibiliAPI, USER_AGENT } from './constants';
import { assertIsQRCodeResponse } from './typePredicates';

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

export const QRCodeLogin = async (oauthKey: string): Promise<string> => {
  const response = await (
    await fetch(
      bilibiliAPI.QRCODE_FINAL_LOGIN,
      produce(POST_OPTION, (draft) => {
        draft.body = `oauthKey=${oauthKey}`;
      })
    )
  ).json();
  return response.data;
};

export const dummy = 123;
