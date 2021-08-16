import * as React from 'react';
import { FormContext } from './context';
import { errorReducer } from './reducer';
import { FormConfig, FormContextType, FormState } from './types';
import { validator } from './validator';

export const useForm = <F>() => {
  const formContext = React.useContext<FormContextType<F>>(FormContext);
  return formContext;
};

export const useFormValidation = <F>(
  form: FormState<F>,
  config: ReturnType<FormConfig<F>>
) => {
  const [errors, dispatch] = React.useReducer(errorReducer, []);

  const validateForm = (): boolean => {
    let isValid = true;
    if (form) {
      Object.keys(form).forEach((field) => {
        if (!validateField(field as keyof F, form[field as keyof F])) {
          isValid = false;
        }
      });
    }

    return isValid;
  };

  const validateField = (key: keyof F, value: any): boolean => {
    if (form && config) {
      const fieldConfig = config.fields.find((c) => c.key === key);
      if (fieldConfig) {
        return validator<F>(
          {
            key,
            value: value,
          },
          fieldConfig?.validators,
          dispatch
        );
      }
    }

    return true;
  };

  const clear = () => {
    dispatch({
      type: 'clear',
    });
  };

  return { errors, validateField, validateForm, clearErrors: clear };
};
