import React from 'react';
import './Loader.scss';
import { useAppSelector } from '../../app/hooks';

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
