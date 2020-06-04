import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparedTodos } from '../helpers/api';
import {
  setTodos, getLoading, setIsLoaded, startLoading, setError,
} from '../store';

export const LoadButton = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  const loadTodos = async () => {
    dispatch(startLoading());
    try {
      const fetchedTodos = await getPreparedTodos();

      dispatch(setTodos(fetchedTodos));
      dispatch(setIsLoaded());
      } catch (error) {
        dispatch(setError(`Something went wrong: ${error}`));
      }
    dispatch(setIsLoaded());
  };

  return (
    <button
      type="button"
      className="btn btn-primary btn-lg mb-2"
      onClick={loadTodos}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load todos'}
    </button>
  );
};
