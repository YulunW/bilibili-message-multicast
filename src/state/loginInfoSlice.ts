import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginStatus } from 'types/loginStatus';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { AppDispatch, RootState } from './store';
import { QRCODE_EXPIRE_SECOND } from '../helpers/constants';
import { getQRCode } from '../helpers/bilibiliAPICaller';

export interface LoginInfoState {
  oauthKey: string;
  expireTime: number;
  status: LoginStatus;
}

const initialState: LoginInfoState = {
  oauthKey: '',
  expireTime: 0,
  status: LoginStatus.UNINITIALIZED,
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
  },
});

export const { setOAuth, setStatus } = loginInfoSlice.actions;

export const retrieveQRCode = async (
  dispatch: AppDispatch,
  getState: RootState
) => {
  dispatch(setStatus(LoginStatus.LOADING));
  const oauthKey = await getQRCode();
  dispatch(setOAuth(oauthKey));
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
