import { FormState } from '../../components/Form/types';

export type PMFormData = {
  password: string;
  rePassword: string;
  hint: string;
};

export type PMStateResult = 'success' | 'error';

export interface PasswordManagerStateType {
  form: FormState<PMFormData>;
  busy: boolean;
  result?: PMStateResult;
}

export type PMReducerAction =
  | {
      type: 'reset';
    }
  | {
      type: 'updateField';
      payload: Partial<PMFormData>;
    }
  | {
      type: 'result';
      payload: PMStateResult;
    }
  | {
      type: 'busy';
      payload: boolean;
    };

export const DEFAULT_PASSWORD_MANAGER_STATE: PasswordManagerStateType = {
  form: {
    password: '',
    rePassword: '',
    hint: '',
  },
  busy: false,
};
