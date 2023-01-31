import React from 'react';

export const Error: React.FC = ({ children }) => (
  <p className="notification is-warning">
    {children}
  </p>
);
