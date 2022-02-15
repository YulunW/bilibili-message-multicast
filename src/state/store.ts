// Circular dependency is needed to infer types.
/* eslint-disable import/no-cycle */

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginInfoReducer from './loginInfoSlice';
import userInfoReducer from './userInfoSlice';
import templateReducer from './templateSlice';

export const store = configureStore({
  reducer: {
    loginInfo: loginInfoReducer,
    userInfo: userInfoReducer,
    templates: templateReducer,
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
