import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparedTodos } from '../helpers/api';
import {
  setTodos, getLoading, setIsLoaded, startLoading,
} from '../store';

export const Loader = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  const loadTodos = useCallback(() => {
    dispatch(startLoading());

    setTimeout(async () => {
      const fetchedTodos = await getPreparedTodos();

      dispatch(setTodos(fetchedTodos));
      dispatch(setIsLoaded());
    }, 1000);
  }, [dispatch]);

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
