import * as React from 'react';
import { FormContext } from './context';
import { FormConfig, FormError, FormState } from './types';

type Props<F> = {
  children: React.ReactNode | React.ReactNode[];
  form: FormState<F>;
  errors: FormError<F>[];
  config: ReturnType<FormConfig<F>>;
  busy?: boolean;
  update: (key: keyof F, value: any) => void;
  onSubmit?: (state: F) => any | Promise<any>;
};

function FormContextProvider<F>({
  children,
  form,
  update,
  config,
  errors,
  busy,
  onSubmit,
}: Props<F>) {
  const updateField = (key: any, value: any) => {
    update(key, value);
  };

  return (
    <FormContext.Provider
      value={{ form, update: updateField, config, errors, busy }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
