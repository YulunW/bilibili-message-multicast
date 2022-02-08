// Circular dependency is needed to infer types.
/* eslint-disable import/no-cycle */

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginInfoReducer from './loginInfoSlice';
import userInfoReducer from './userInfoSlice';

export const store = configureStore({
  reducer: {
    loginInfo: loginInfoReducer,
    userInfo: userInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
