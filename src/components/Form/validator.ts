import {
  FormErrorReducerAction,
  FormValidator,
  FormValidatorHandler,
  PatternValidator,
  ValidatorConstants,
} from './types';

export const FormValidators: ValidatorConstants = {
  REQUIRED: () => ({
    type: 'required',
  }),
  MIN_LENGTH: (value: number) => ({
    type: 'minLength',
    length: value,
  }),
  MAX_LENGTH: (value: number) => ({
    type: 'maxLength',
    length: value,
  }),
  PATTERN: (value: PatternValidator) => ({
    type: 'pattern',
    pattern: value,
  }),
  SAME_AS: (target: { name: string; value: string | number }) => ({
    type: 'sameAs',
    target: target,
  }),
};

export const validator = <F>(
  input: { key: keyof F; value: any },
  rules: FormValidator[] | undefined,
  errorDispatcher: React.Dispatch<FormErrorReducerAction<any>>
): boolean => {
  const { key, value } = input;
  let isValid = true;
  rules?.forEach((rule) => {
    const [errName, pass, message, args] = ValidatorHandler[rule.type](
      value,
      rule
    );

    if (!pass) {
      errorDispatcher({
        type: 'add',
        payload: {
          key,
          errName,
          message: {
            [message]: args,
          },
        },
      });
      isValid = false;
    } else {
      errorDispatcher({
        type: 'remove',
        payload: {
          key: key as string,
          errName: errName,
        },
      });
    }
  });

  return isValid;
};

export const ValidatorHandler: FormValidatorHandler = {
  required: (value: any) => {
    const pass = typeof value !== 'undefined' && value !== null && value !== '';
    return ['required', pass, 'form.validation.required'];
  },
  minLength: (value: string, { length }: { length: number }) => {
    return [
      'minLength',
      value.length >= length,
      'form.validation.minLength',
      { length },
    ];
  },
  maxLength: (value: string, { length }: { length: number }) => {
    return [
      'maxLength',
      value.length <= length,
      'form.validation.maxLength',
      { length },
    ];
  },
  pattern: (value: string, { pattern }: { pattern: PatternValidator }) => {
    return [
      `pattern-${pattern.name}`,
      pattern.regex.test(value),
      `form.validation.pattern.${pattern.name}`,
    ];
  },
  sameAs: (
    value: string | number,
    { target }: { target: { name: string; value: string | number } }
  ) => {
    return [
      `sameAs-${target.name}`,
      value === target.value,
      `form.validation.sameAs.${target.name}`,
    ];
  },
};
