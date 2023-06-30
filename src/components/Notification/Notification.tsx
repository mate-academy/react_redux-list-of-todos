import React from 'react';

type Props = {
  errorMessage: string,
};

export const Notification: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div>
      {errorMessage}
    </div>
  );
};
