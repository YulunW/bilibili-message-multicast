export type QRConfirmSuccess = {
  code: number;
  ts: number;
  status: boolean;
  data: {
    url: string;
  };
};

export enum QRFailReason {
  OauthKeyError = -1,
  OauthKeyOvertime = -2,
  NotScanned = -4,
  NotConfirmed = -5,
}

export type QRConfirmFail = {
  message: string;
  status: boolean;
  data: QRFailReason;
};
