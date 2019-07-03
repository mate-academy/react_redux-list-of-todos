import React from 'react';

function Buttons({ onClickHandler, isRequested }) {
  return (
    <button
      onClick={onClickHandler}
      disabled={isRequested}>
      {isRequested ? 'Loading...' : 'Load Data'}
    </button>
  );
}

export default Buttons;
