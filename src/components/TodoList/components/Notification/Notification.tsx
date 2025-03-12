import React from 'react';

export const Notification: React.FC = () => {
  return (
    <p className="notification is-warning">
      There are no todos matching current filter criteria
    </p>
  );
};
