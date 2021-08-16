import React from 'react';
import { FormContextType } from './types';

export const FormContext = React.createContext<FormContextType>({
  form: {},
  update: () => {},
  errors: [],
  config: {
    fields: [],
  },
});
