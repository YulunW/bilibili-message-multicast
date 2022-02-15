/*
 * Generated type guards for "qrResponse.ts".
 * WARNING: Do not manually change this file.
 */
import { QRCodeResponseData, QRCodeResponse } from "./qrResponse";

export function isQRCodeResponseData(obj: any, _argumentName?: string): obj is QRCodeResponseData {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.url === "string" &&
        typeof obj.oauthKey === "string"
    )
}

export function isQRCodeResponse(obj: any, _argumentName?: string): obj is QRCodeResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.code === "number" &&
        typeof obj.status === "boolean" &&
        typeof obj.ts === "number" &&
        isQRCodeResponseData(obj.data) as boolean
    )
}
