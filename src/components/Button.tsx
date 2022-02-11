import React from 'react';


type Pros = {
  text: string;
  disabled?: boolean;
  status?: string;
  onClick: () => void
}

const Button: React.FC<Pros> = ({text, disabled = false, onClick, status= 'primary'}) => {
  return (
    <button
      className={"btn btn-outline-" + status}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;
