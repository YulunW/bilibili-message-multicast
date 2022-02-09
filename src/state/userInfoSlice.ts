import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserBasicInfo } from 'helpers/bilibiliAPICaller';
import { UserBasicInfo } from 'types/userInfo';
// Circular dependency is needed to infer types. And since we are only importing types it shouldn't be a big problem
/* eslint-disable-next-line import/no-cycle */
import { AppDispatch } from './store';

export interface UserInfoState {
  userBasicInfo?: UserBasicInfo;
}

const initialState: UserInfoState = {};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserInfo: (state, action: PayloadAction<UserBasicInfo>) => {
      state.userBasicInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export const getUserBasicInfo = async (dispatch: AppDispatch) => {
  const result = await fetchUserBasicInfo();
  if (!result.isLogin) {
    return;
  }
  dispatch(setUserInfo(result));
};

export const getUserInfos = async (dispatch: AppDispatch) => {
  dispatch(getUserBasicInfo);
};

export default userInfoSlice.reducer;
