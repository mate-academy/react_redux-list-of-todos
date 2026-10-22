import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import './Loader.scss';

export const Loader: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
