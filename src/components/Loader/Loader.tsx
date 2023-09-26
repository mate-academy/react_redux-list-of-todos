import React from 'react';
import './Loader.scss';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const Loader: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="Loader" data-cy="loader">
        <div className="Loader__content" />
      </div>
    );
  }

  return <>{children}</>;
};
