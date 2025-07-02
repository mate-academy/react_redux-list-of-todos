import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './Loader.scss';

export const Loader: React.FC = () => {
  const isLoading = useAppSelector(state => state.todos.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
