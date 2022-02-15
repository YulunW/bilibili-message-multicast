/*
 * Generated type guards for "viewerInfo.ts".
 * WARNING: Do not manually change this file.
 */
import { ViewerType, ViewerInfoFetched, ViewerInfo } from "./viewerInfo";

export function isViewerType(obj: any, _argumentName?: string): obj is ViewerType {
    return (
        (obj === ViewerType.总督 ||
            obj === ViewerType.提督 ||
            obj === ViewerType.舰长 ||
            obj === ViewerType.无)
    )
}

export function isViewerInfoFetched(obj: any, _argumentName?: string): obj is ViewerInfoFetched {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        isViewerType(obj.guard_level) as boolean &&
        typeof obj.face === "string" &&
        typeof obj.username === "string" &&
        typeof obj.uid === "number" &&
        typeof obj.rank === "number"
    )
}

export function isViewerInfo(obj: any, _argumentName?: string): obj is ViewerInfo {
    return (
        isViewerInfoFetched(obj) as boolean &&
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        Array.isArray(obj.previous_usernames) &&
        obj.previous_usernames.every((e: any) =>
            typeof e === "string"
        )
    )
}
