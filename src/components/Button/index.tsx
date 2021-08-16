import * as React from 'react';

type Props = {
  text: string;
  onClick: (event: React.MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;
  testId?: string;
};

function Button(
  {
    className,
    text,
    type,
    onClick,
    loading,
    disabled,
    LeftIcon,
    RightIcon,
    testId,
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const handleClick = (event: React.MouseEvent) => {
    if (!loading && !disabled) {
      onClick(event);
    }
  };

  return (
    <button
      ref={ref}
      data-testid={testId}
      className={`btn ${className || ''} ${
        loading || disabled ? 'disabled' : ''
      }`}
      onClick={handleClick}
      type={type ? type : 'button'}
    >
      {LeftIcon && (
        <span className="left-icon">
          <LeftIcon />
        </span>
      )}
      <span className="text">{text}</span>
      {RightIcon && (
        <span className="right-icon">
          <RightIcon />
        </span>
      )}
    </button>
  );
}

export default React.forwardRef(Button);
