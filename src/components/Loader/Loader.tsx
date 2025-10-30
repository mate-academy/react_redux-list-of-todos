import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './Loader.scss';

interface LoaderProps {
  loading?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading: loadingProp }) => {
  const todosLoading = useAppSelector(state => state.todos.loading);
  const loading = loadingProp !== undefined ? loadingProp : todosLoading;

  if (!loading) {
    return null;
  }

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
