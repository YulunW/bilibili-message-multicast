export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 61.0.3163.100 Safari / 537.36';

/**
 * Start of Bilibili APIs
 */
export const bilibiliAPI = {
  QRCODE_REQUEST: 'https://passport.bilibili.com/qrcode/getLoginUrl',
  QRCODE_FINAL_LOGIN: 'https://passport.bilibili.com/qrcode/getLoginInfo',
  USER_BASIC_INFO: 'https://api.bilibili.com/x/web-interface/nav',
  QRCODE_CONFIRM_SITE: 'https://passport.bilibili.com/qrcode/h5/login',
};

/**
 * Start of QR code related constants
 */
// The interval to attempt login in milliseconds
export const QRCODE_LOGIN_ATTEMPT_INTERVAL = 5000;
// When the QR code should expire.
export const QRCODE_EXPIRE_SECOND = 180;
