/* eslint-disable import/no-cycle */

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { store } from 'state/store';
import { setTemplates } from 'state/templateSlice';

export const COOKIE_PERSIST_KEY = 'cookie';
export const TEMPLATES_PERSIST_KEY = 'templates';

type KeyToAction = {
  key: string;
  // We need to specify any type of payload so by definition any is required.
  // TODO: find out if there is a better way to specify type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: ActionCreatorWithPayload<any, string>;
};

const actionArray: Array<KeyToAction> = [
  {
    key: TEMPLATES_PERSIST_KEY,
    action: setTemplates,
  },
];

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
