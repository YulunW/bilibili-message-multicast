/* eslint-disable */
import type { LoginStatus } from '../types/loginStatus';
import type {
  QRConfirmSuccess,
  QRConfirmFail,
  QRFailReason,
} from '../types/qrConfirm';
import type { QRCodeResponseData, QRCodeResponse } from '../types/qrResponse';

const isNumber = (value: unknown): value is number => typeof value === 'number';
const isString = (value: unknown): value is string => typeof value === 'string';
const isUnion =
  (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false);
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isLoginStatus = (arg_0: unknown): arg_0 is LoginStatus =>
  isUnion([
    (arg_1: unknown): boolean => arg_1 === 0,
    (arg_1: unknown): boolean => arg_1 === 1,
    (arg_1: unknown): boolean => arg_1 === 2,
    (arg_1: unknown): boolean => arg_1 === 3,
    (arg_1: unknown): boolean => arg_1 === 4,
    (arg_1: unknown): boolean => arg_1 === 5,
  ])(arg_0);
export function assertIsLoginStatus(
  value: unknown
): asserts value is LoginStatus {
  if (!isLoginStatus(value))
    throw new TypeError(`value must be LoginStatus but received ${value}`);
}
export const isQRConfirmSuccess = (arg_0: unknown): arg_0 is QRConfirmSuccess =>
  isObject(arg_0) &&
  'code' in arg_0 &&
  isNumber(arg_0.code) &&
  'ts' in arg_0 &&
  isNumber(arg_0.ts) &&
  'status' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isUnion([
      (arg_2: unknown): boolean => arg_2 === false,
      (arg_2: unknown): boolean => arg_2 === true,
    ])(arg_1))(arg_0.status) &&
  'data' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isObject(arg_1) && 'url' in arg_1 && isString(arg_1.url))(arg_0.data);
export function assertIsQRConfirmSuccess(
  value: unknown
): asserts value is QRConfirmSuccess {
  if (!isQRConfirmSuccess(value))
    throw new TypeError(`value must be QRConfirmSuccess but received ${value}`);
}
export const isQRConfirmFail = (arg_0: unknown): arg_0 is QRConfirmFail =>
  isObject(arg_0) &&
  'message' in arg_0 &&
  isString(arg_0.message) &&
  'status' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isUnion([
      (arg_2: unknown): boolean => arg_2 === false,
      (arg_2: unknown): boolean => arg_2 === true,
    ])(arg_1))(arg_0.status) &&
  'data' in arg_0 &&
  isQRFailReason(arg_0.data);
export function assertIsQRConfirmFail(
  value: unknown
): asserts value is QRConfirmFail {
  if (!isQRConfirmFail(value))
    throw new TypeError(`value must be QRConfirmFail but received ${value}`);
}
export const isQRFailReason = (arg_0: unknown): arg_0 is QRFailReason =>
  isUnion([
    (arg_1: unknown): boolean => arg_1 === -1,
    (arg_1: unknown): boolean => arg_1 === -2,
    (arg_1: unknown): boolean => arg_1 === -4,
    (arg_1: unknown): boolean => arg_1 === -5,
  ])(arg_0);
export function assertIsQRFailReason(
  value: unknown
): asserts value is QRFailReason {
  if (!isQRFailReason(value))
    throw new TypeError(`value must be QRFailReason but received ${value}`);
}
export const isQRCodeResponseData = (
  arg_0: unknown
): arg_0 is QRCodeResponseData =>
  isObject(arg_0) &&
  'url' in arg_0 &&
  isString(arg_0.url) &&
  'oauthKey' in arg_0 &&
  isString(arg_0.oauthKey);
export function assertIsQRCodeResponseData(
  value: unknown
): asserts value is QRCodeResponseData {
  if (!isQRCodeResponseData(value))
    throw new TypeError(
      `value must be QRCodeResponseData but received ${value}`
    );
}
export const isQRCodeResponse = (arg_0: unknown): arg_0 is QRCodeResponse =>
  isObject(arg_0) &&
  'code' in arg_0 &&
  isNumber(arg_0.code) &&
  'status' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isUnion([
      (arg_2: unknown): boolean => arg_2 === false,
      (arg_2: unknown): boolean => arg_2 === true,
    ])(arg_1))(arg_0.status) &&
  'ts' in arg_0 &&
  isNumber(arg_0.ts) &&
  'data' in arg_0 &&
  isQRCodeResponseData(arg_0.data);
export function assertIsQRCodeResponse(
  value: unknown
): asserts value is QRCodeResponse {
  if (!isQRCodeResponse(value))
    throw new TypeError(`value must be QRCodeResponse but received ${value}`);
}
