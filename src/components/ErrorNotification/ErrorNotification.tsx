import React from 'react';

type Props = {
  errorMessage: string,
};

export const ErrorNotification: React.FC<Props> = React.memo((
  { errorMessage },
) => {
  return (
    <p className="notification is-danger">
      {errorMessage}
    </p>
  );
});
