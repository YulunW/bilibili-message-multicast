// We could not export enum as default, so it would be better doing it this way
// eslint-disable-next-line import/prefer-default-export
export enum LoginStatus {
  UNINITIALIZED,
  LOADING,
  FAILED,
  WAITING_SCAN,
  WAITING_CONFIRM,
  LOGGED_IN,
}
