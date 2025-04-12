import React from 'react';
import './Loader.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Loader: React.FC = () => {
  const status = useSelector((state: RootState) => state.todos.status);

  if (status !== 'loading') {
    return null;
  }

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
