/*
 * Generated type guards for "userInfo.ts".
 * WARNING: Do not manually change this file.
 */
import { UserCookies, UserBasicInfo, UserBasicInfoFetchFailed, UserBasicInfoResponse } from "./userInfo";

export function isUserCookies(obj: any, _argumentName?: string): obj is UserCookies {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.DedeUserID === "string" &&
        typeof obj.DedeUserID__ckMd5 === "string" &&
        typeof obj.SESSDATA === "string" &&
        typeof obj.bili_jct === "string"
    )
}

export function isUserBasicInfo(obj: any, _argumentName?: string): obj is UserBasicInfo {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.isLogin === true &&
        typeof obj.face === "string" &&
        typeof obj.mid === "number" &&
        typeof obj.uname === "string"
    )
}

export function isUserBasicInfoFetchFailed(obj: any, _argumentName?: string): obj is UserBasicInfoFetchFailed {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        obj.isLogin === false
    )
}

export function isUserBasicInfoResponse(obj: any, _argumentName?: string): obj is UserBasicInfoResponse {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.code === "number" &&
        (isUserBasicInfo(obj.data) as boolean ||
            isUserBasicInfoFetchFailed(obj.data) as boolean) &&
        typeof obj.message === "string" &&
        typeof obj.ttl === "number"
    )
}
