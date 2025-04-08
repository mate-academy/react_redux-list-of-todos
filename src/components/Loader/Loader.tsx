import React from 'react';
import { useAppSelector } from '../../app/hooks';
import './Loader.scss';

interface Props {
  isLoading?: boolean;
}

export const Loader: React.FC<Props> = ({ isLoading: isLoadingProp }) => {
  const isLoadingTodos = useAppSelector(state => state.todos.length === 0);
  const isLoading = isLoadingProp ?? isLoadingTodos;

  if (!isLoading) {
    return null;
  }

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};
