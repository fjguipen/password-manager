import { FormError, FormErrorReducerAction } from './types';

const equalError = (a: FormError, b: Partial<FormError>) => {
  return a.key === b.key && a.errName === b.errName;
};

export const errorReducer = <F>(
  prev: FormError<F>[],
  action: FormErrorReducerAction<F>
) => {
  switch (action.type) {
    case 'add':
      const state = [
        ...prev.filter((e) => !equalError(e, action.payload)),
        action.payload,
      ];
      return state;
    case 'remove':
      return [...prev.filter((e) => !equalError(e, action.payload))];
    case 'clear':
      return [];
    default:
      return prev;
  }
};
