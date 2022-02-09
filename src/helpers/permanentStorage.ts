/* eslint-disable import/no-cycle */

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { store } from 'state/store';

export const COOKIE_PERSIST_KEY = 'cookie';

type KeyToAction = {
  key: string;
  action: ActionCreatorWithPayload<unknown, string>;
};

const actionArray: Array<KeyToAction> = [];

export const initStates = () => {
  actionArray.forEach((kToA) => {
    const value = window.electron.store.get(kToA.key);
    if (value !== undefined) {
      store.dispatch(kToA.action(value));
    }
  });
};

export const persistKey = (key: string, value: unknown) => {
  if (value !== undefined) {
    window.electron.store.set(key, value);
  } else {
    window.electron.store.delete(key);
  }
};
