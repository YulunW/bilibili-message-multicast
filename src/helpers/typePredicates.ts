import type { QRCodeResponse, QRCodeResponseData } from '../types/qrResponse';

const isNumber = (value: unknown): value is number => typeof value === 'number';
const isString = (value: unknown): value is string => typeof value === 'string';
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isUnion =
  (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false);

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
