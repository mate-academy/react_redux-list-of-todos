import React from 'react';

type Props = {
  errorMessage: string,
};

export const Error: React.FC<Props> = ({ errorMessage }) => (
  <div className="notification is-danger">
    <button
      className="delete"
      type="button"
      aria-label="close error notification"
    />
    {errorMessage}
  </div>
);
