import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginStatus } from 'types/loginStatus';
import {
  assertIsUserCookiesFromQuery,
  isQRConfirmSuccess,
} from 'helpers/typePredicates';
import { QRFailReason } from 'types/qrConfirm';
import { UserCookies } from 'types/userInfo';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { COOKIE_PERSIST_KEY, persistKey } from 'helpers/permanentStorage';
import { getParamsToObj } from 'helpers/object';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { AppDispatch, RootState } from './store';
import { QRCODE_EXPIRE_SECOND } from '../helpers/constants';
import {
  convertCookie,
  getQRCode,
  QRCodeLogin,
} from '../helpers/bilibiliAPICaller';

export interface LoginInfoState {
  oauthKey: string;
  expireTime: number;
  status: LoginStatus;
  trackQRStat: boolean;
  cookies?: UserCookies;
}

const initialState: LoginInfoState = {
  oauthKey: '',
  expireTime: 0,
  status: LoginStatus.UNINITIALIZED,
  trackQRStat: false,
  cookies: undefined,
};

export const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setOAuth: (state, action: PayloadAction<string>) => {
      state.status = LoginStatus.WAITING_SCAN;
      state.expireTime = new Date().getTime() + QRCODE_EXPIRE_SECOND * 1000;
      state.oauthKey = action.payload;
    },
    setStatus: (state, action: PayloadAction<LoginStatus>) => {
      state.status = action.payload;
    },
    setTrack: (state, action: PayloadAction<boolean>) => {
      state.trackQRStat = action.payload;
    },
    setCookies: (state, action: PayloadAction<UserCookies>) => {
      let result: UserCookies | undefined = action.payload;
      if (action.payload.Expires < new Date().getTime()) {
        result = undefined;
      } else {
        state.status = LoginStatus.LOGGED_IN;
      }
      state.cookies = result;
      persistKey(COOKIE_PERSIST_KEY, result);
    },
  },
});

export const { setOAuth, setStatus, setTrack, setCookies } =
  loginInfoSlice.actions;

export const checkQRCodeStat = async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const { oauthKey, trackQRStat } = getState().loginInfo;
  if (!trackQRStat) {
    return;
  }
  const result = await QRCodeLogin(oauthKey);
  if (isQRConfirmSuccess(result)) {
    const cookies = getParamsToObj(result.data.url);
    assertIsUserCookiesFromQuery(cookies);
    dispatch(setCookies(convertCookie(cookies)));
  } else {
    switch (result.data) {
      case QRFailReason.OauthKeyError:
      case QRFailReason.OauthKeyOvertime:
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        dispatch(retrieveQRCode);
        break;
      case QRFailReason.NotConfirmed:
        dispatch(setStatus(LoginStatus.WAITING_CONFIRM));
      // eslint-disable-next-line no-fallthrough
      case QRFailReason.NotScanned:
        setTimeout(() => {
          dispatch(checkQRCodeStat);
        }, 15000);
        break;
      default:
        throw new Error('unexpected result data type');
    }
  }
};

export const retrieveQRCode = async (
  dispatch: AppDispatch
  // getState: () => RootState
) => {
  dispatch(setStatus(LoginStatus.LOADING));
  const oauthKey = await getQRCode();
  dispatch(setOAuth(oauthKey));
  setTimeout(() => {
    dispatch(checkQRCodeStat);
  }, 15000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getOAuthKey = (state: RootState) => state.loginInfo.oauthKey;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = getQRCode(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default loginInfoSlice.reducer;
