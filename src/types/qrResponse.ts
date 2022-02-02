export type QRCodeResponseData = {
  url: string;
  oauthKey: string;
};

export type QRCodeResponse = {
  code: number;
  status: boolean;
  ts: number;
  data: QRCodeResponseData;
};
