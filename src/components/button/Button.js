import React from 'react';

function Button(props) {
  const { text , clickAction, disabled } = props;
  return (
    <button
      type="button"
      onClick={() => clickAction()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
