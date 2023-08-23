import React from 'react';

type Props = {
  errorMessage: string,
};

export const Error: React.FC<Props> = ({ errorMessage }) => (
  <div className="notification is-danger">
    {errorMessage}
  </div>
);
