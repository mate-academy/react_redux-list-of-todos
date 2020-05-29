import React from 'react';
import './LoadSpinner.scss';

export const LoadSpinner = () => {
  return (
    <div className="Spinner__Wrap">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
