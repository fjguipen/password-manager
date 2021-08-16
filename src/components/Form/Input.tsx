import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInputProps, FormErrorMessage, FormValidator } from './types';

interface Props extends BaseInputProps {
  type: string;
}

function Input({
  name,
  type,
  value,
  onChange,
  label,
  placeholder = '',
  errors,
  children,
  withCounter,
  config,
}: Props) {
  const { t } = useTranslation();

  const validators = config?.validators?.find((v) => v.type === 'maxLength');

  const parseErrorMessage = (err: FormErrorMessage) => {
    let key: string;
    let args: any;
    if (typeof err === 'string') {
      key = err;
    } else {
      key = Object.keys(err)[0];
      args = err[key];
    }

    return t(key, args);
  };

  return (
    <>
      {label && <label htmlFor={name}>{t(label)}</label>}
      <div className="input__control">
        <input
          id={name}
          aria-label={`input-${name}`}
          name={name}
          type={type}
          value={value}
          placeholder={t(placeholder)}
          onChange={onChange}
        />
        {children}
      </div>
      {withCounter && (
        <InputCharactersCounter
          length={value.toString().length}
          validator={validators}
        />
      )}
      {errors && errors.length > 0 && (
        <div className="input__errors">
          {errors.map((err) => (
            <span
              data-testid={`${err.key as string}-${err.errName}`}
              key={`${err.key as string}:${err.errName}`}
              className="input__errors__error"
            >
              {parseErrorMessage(err.message)}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

const InputCharactersCounter = ({
  length,
  validator,
}: {
  length: number;
  validator?: FormValidator;
}) => {
  return (
    <span className="input__count">
      {validator?.type === 'maxLength'
        ? `${length}/${validator.length}`
        : length}
    </span>
  );
};

export default Input;
