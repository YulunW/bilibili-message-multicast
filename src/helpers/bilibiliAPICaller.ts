import produce from 'immer';
import { QRConfirmFail, QRConfirmSuccess } from 'types/qrConfirm';
import { UserBasicInfo, UserBasicInfoFetchFailed } from 'types/userInfo';
import { isQRCodeResponse } from 'types/qrResponse.guard';
import { isQRConfirmFail, isQRConfirmSuccess } from 'types/qrConfirm.guard';
import { isUserBasicInfoResponse } from 'types/userInfo.guard';
import { deepFreeze } from './object';
import { bilibiliAPI, USER_AGENT } from './constants';

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
  if (!isQRCodeResponse(response))
    throw new Error('incorrect format for QRCode Response');
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

export const fetchUserBasicInfo = async (): Promise<
  UserBasicInfo | UserBasicInfoFetchFailed
> => {
  const response = await (
    await fetch(bilibiliAPI.USER_BASIC_INFO, GET_OPTION)
  ).json();
  if (!isUserBasicInfoResponse(response))
    throw new Error('incorrect format for User Basic Info');
  return response.data;
};
