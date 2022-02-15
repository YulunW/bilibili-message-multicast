/*
 * Generated type guards for "qrConfirm.ts".
 * WARNING: Do not manually change this file.
 */
import { QRConfirmSuccess, QRFailReason, QRConfirmFail } from "./qrConfirm";

export function isQRConfirmSuccess(obj: any, _argumentName?: string): obj is QRConfirmSuccess {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.code === "number" &&
        typeof obj.ts === "number" &&
        typeof obj.status === "boolean" &&
        (obj.data !== null &&
            typeof obj.data === "object" ||
            typeof obj.data === "function") &&
        typeof obj.data.url === "string"
    )
}

export function isQRFailReason(obj: any, _argumentName?: string): obj is QRFailReason {
    return (
        (obj === QRFailReason.OauthKeyError ||
            obj === QRFailReason.OauthKeyOvertime ||
            obj === QRFailReason.NotScanned ||
            obj === QRFailReason.NotConfirmed)
    )
}

export function isQRConfirmFail(obj: any, _argumentName?: string): obj is QRConfirmFail {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.message === "string" &&
        typeof obj.status === "boolean" &&
        isQRFailReason(obj.data) as boolean
    )
}
