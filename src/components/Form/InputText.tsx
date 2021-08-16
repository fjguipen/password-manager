import * as React from 'react';
import Input from './Input';
import { BaseInputProps } from './types';

interface Props extends BaseInputProps {}

function InputText({
  name,
  value,
  onChange,
  label,
  placeholder,
  errors,
  withCounter,
  config,
  className,
}: Props) {
  return (
    <div className={`input input-text ${className || ''}`}>
      <Input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        errors={errors}
        withCounter={withCounter}
        config={config}
      />
    </div>
  );
}

export default InputText;
