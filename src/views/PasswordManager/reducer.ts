import { Reducer } from 'react';
import {
  DEFAULT_PASSWORD_MANAGER_STATE,
  PasswordManagerStateType,
  PMReducerAction,
} from './types';

export const PasswordManagerReducer: Reducer<
  PasswordManagerStateType,
  PMReducerAction
> = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload,
        },
      };
    case 'busy':
      return {
        ...state,
        busy: action.payload,
      };
    case 'result':
      return {
        ...state,
        result: action.payload,
      };
    case 'reset':
      return DEFAULT_PASSWORD_MANAGER_STATE;
    default:
      return state;
  }
};
