/*
 * Generated type guards for "loginStatus.ts".
 * WARNING: Do not manually change this file.
 */
import { LoginStatus } from "./loginStatus";

export function isLoginStatus(obj: any, _argumentName?: string): obj is LoginStatus {
    return (
        (obj === LoginStatus.UNINITIALIZED ||
            obj === LoginStatus.LOADING ||
            obj === LoginStatus.FAILED ||
            obj === LoginStatus.WAITING_SCAN ||
            obj === LoginStatus.WAITING_CONFIRM ||
            obj === LoginStatus.LOGGED_IN)
    )
}
