import React from 'react';
import './ErrorMessage.scss';

type Props = {
  errorMessage: string,
};

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="error">
      <h2 className="error__message">{errorMessage}</h2>
    </div>
  );
};
