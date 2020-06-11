/* eslint-disable import/no-duplicates */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparedTodos } from '../helpers/api';
import * as selector from '../store';
import * as actionCreator from '../store';

const LoadingButtons = () => {
  const dispatch = useDispatch();

  const handleLoadClick = async () => {
    dispatch(actionCreator.startLoading()); // dispatch isLoading to true

    try {
      const todosWithUsers = await getPreparedTodos();

      dispatch(actionCreator.loadTodos(todosWithUsers));
    } catch (error) {
      dispatch(actionCreator.finishLoading());
      dispatch(actionCreator.setErrorMessage('Errors happens, try to reload')); // dispatch some error message
    }

    dispatch(actionCreator.finishLoading()); // dispatch isLoading to false
  };

  const isLoading = useSelector(selector.isLoading);
  const todos = useSelector(selector.getLoadedTodos);
  const errorMessage = useSelector(selector.getMessage);


  return (
    isLoading
      ? (
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          Loading...
        </button>
      )
      : (
        <>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleLoadClick}
            hidden={todos.length !== 0}
          >
            <span role="status" aria-hidden="true" />
            Load
          </button>
          <p
            className="alert alert-primary mt5"
            hidden={errorMessage === ''}
            role="alert"
          >
            {`¯\\_(ツ)_/¯ ${errorMessage}`}
          </p>
        </>
      )
  );
};

export default LoadingButtons;
