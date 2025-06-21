import React from 'react';
import './Loader.scss';

type Props = {
  loadingTodos: boolean;
};

export const Loader: React.FC<Props> = ({ loadingTodos }) => {
  return (
    <>
      {loadingTodos && (
        <div className="Loader" data-cy="loader">
          <div className="Loader__content" />
        </div>
      )}{' '}
    </>
  );
};
