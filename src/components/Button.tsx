import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="btn btn-secondary active"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
