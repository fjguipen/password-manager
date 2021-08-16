import * as React from 'react';
import Input from './Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BaseInputProps } from './types';

interface Props extends BaseInputProps {}

function InputPassword({
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
  const [visible, setVisible] = React.useState(false);

  const handleVisiblity = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={`input input-password ${className || ''}`}>
      <Input
        type={visible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        config={config}
        withCounter={withCounter}
        errors={errors}
      >
        <div
          className="input-password__visibility-handler"
          onClick={handleVisiblity}
        >
          <span className="icon--interactive">
            {visible ? (
              <FaEyeSlash className="icon" />
            ) : (
              <FaEye className="icon" />
            )}
          </span>
        </div>
      </Input>
    </div>
  );
}

export default InputPassword;
