export type FormState<F> = {
  [key in keyof F]: any;
};

export interface FormFieldConfig<F = any> {
  key: keyof F;
  validators?: FormValidator[];
}

export type FormConfig<F = any> = (form: F) => {
  fields: FormFieldConfig<F>[];
};

export type FormContextType<F = any> = {
  form: FormState<F>;
  errors: FormError<F>[];
  config: ReturnType<FormConfig<F>>;
  update: (key: keyof F, value: any) => void;
  busy?: boolean;
  onSubmit?: (state: F) => any | Promise<any>;
};

export type FormErrorMessage =
  | string
  | {
      [key: string]: { [key: string]: string | number | undefined } | undefined;
    };

export interface FormError<F = any> {
  key: keyof F;
  errName: string;
  message: FormErrorMessage;
}

export type FormErrorReducerAction<F> =
  | {
      type: 'add';
      payload: FormError<F>;
    }
  | {
      type: 'remove';
      payload: {
        key: string;
        errName: string;
      };
    }
  | {
      type: 'clear';
    };

export interface PatternValidator {
  name: string;
  regex: RegExp;
}

export type FormValidator =
  | {
      type: 'required';
    }
  | {
      type: 'minLength';
      length: number;
    }
  | {
      type: 'maxLength';
      length: number;
    }
  | {
      type: 'pattern';
      pattern: PatternValidator;
    }
  | {
      type: 'sameAs';
      target: {
        name: string;
        value: string | number;
      };
    };

const VALIDATORS_KEYNAMES = [
  'REQUIRED',
  'MIN_LENGTH',
  'MAX_LENGTH',
  'PATTERN',
  'SAME_AS',
] as const;

export type ValidatorConstants = {
  [key in typeof VALIDATORS_KEYNAMES[number]]: (value?: any) => FormValidator;
};

export type FormValidatorHandler = {
  [key in FormValidator['type']]: (
    value: any,
    checker: any
  ) => [
    string,
    boolean,
    string,
    { [key: string]: string | number | undefined }?
  ];
};

export type FormUpdater = <F>(key: keyof F, value: any) => void;

export interface BaseInputProps {
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  errors?: FormError[];
  children?: React.ReactNode | React.ReactNode[];
  withCounter?: boolean;
  config?: FormFieldConfig;
  className?: string;
}

export interface TextInputProps extends BaseInputProps {}

export interface PasswordInputProps extends BaseInputProps {
  visible: boolean;
}
