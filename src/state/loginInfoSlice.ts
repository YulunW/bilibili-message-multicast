import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginStatus } from 'types/loginStatus';
import {
  assertIsUserCookies,
  isQRConfirmSuccess,
} from 'helpers/typePredicates';
import { QRFailReason } from 'types/qrConfirm';
import { UserCookies } from 'types/userInfo';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { CookiesToObj } from 'helpers/userInfo';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { AppDispatch, RootState } from './store';
import {
  QRCODE_EXPIRE_SECOND,
  QRCODE_LOGIN_ATTEMPT_INTERVAL,
} from '../helpers/constants';
import { getQRCode, QRCodeLogin } from '../helpers/bilibiliAPICaller';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { getUserInfos } from './userInfoSlice';

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
      state.status = LoginStatus.LOGGED_IN;
      state.cookies = action.payload;
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
    const cookies = CookiesToObj();
    assertIsUserCookies(cookies);
    dispatch(setCookies(cookies));
    dispatch(getUserInfos);
  } else {
    switch (result.data) {
      case QRFailReason.OauthKeyError:
      case QRFailReason.OauthKeyOvertime:
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        dispatch(retrieveQRCode);
        break;
      // Redundant code as fallthrough not permitted.
      case QRFailReason.NotConfirmed:
        dispatch(setStatus(LoginStatus.WAITING_CONFIRM));
        setTimeout(() => {
          dispatch(checkQRCodeStat);
        }, QRCODE_LOGIN_ATTEMPT_INTERVAL);
        break;
      case QRFailReason.NotScanned:
        setTimeout(() => {
          dispatch(checkQRCodeStat);
        }, QRCODE_LOGIN_ATTEMPT_INTERVAL);
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
