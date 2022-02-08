export type UserCookies = {
  DedeUserID: string;
  DedeUserID__ckMd5: string;
  SESSDATA: string;
  bili_jct: string;
};

export type UserBasicInfo = {
  isLogin: true;
  face: string;
  mid: number;
  uname: string;
};

export type UserBasicInfoFetchFailed = {
  isLogin: false;
};

export type UserBasicInfoResponse = {
  code: number;
  data: UserBasicInfo | UserBasicInfoFetchFailed;
  message: string;
  ttl: number;
};
