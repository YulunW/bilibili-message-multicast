import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// Circular dependency is needed to infer types.
/* eslint-disable-next-line import/no-cycle */
import loginInfoReducer from './loginInfoSlice';

export const store = configureStore({
  reducer: {
    loginInfo: loginInfoReducer,
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
