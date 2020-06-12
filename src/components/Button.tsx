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
      className="button btn load-btn"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
