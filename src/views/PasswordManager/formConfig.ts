import { FormConfig } from '../../components/Form/types';
import { FormValidators } from '../../components/Form/validator';
import { PMFormData } from './types';

export const PMFormConfig: FormConfig<PMFormData> = (form: PMFormData) => ({
  fields: [
    {
      key: 'password',
      validators: [
        FormValidators.REQUIRED(),
        FormValidators.MIN_LENGTH(8),
        FormValidators.MAX_LENGTH(24),
        FormValidators.PATTERN({
          name: 'password',
          regex: /(?=.*[A-Z])(?=.*\d)/,
        }),
      ],
    },
    {
      key: 'rePassword',
      validators: [
        FormValidators.REQUIRED(),
        FormValidators.SAME_AS({
          name: 'password',
          value: form.password,
        }),
      ],
    },
    {
      key: 'hint',
      validators: [FormValidators.MAX_LENGTH(255)],
    },
  ],
});
