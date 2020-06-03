import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPrepareTodos } from './components/helpers/api';
import './App.scss';
import TodoList from './components/TodoList';
import Loading from './components/Loading';
import SortButtons from './components/SortButtons';

import {
  startLoading,
  finishLoading,
  handleSuccess,
  handleError,
  getIsLoading,
  getFinishLoading,
  getError,
  getVisibleTodos,
} from './store';


const App = () => {
  const dispatch = useDispatch();

  const hasError = useSelector(getError);
  const isLoading = useSelector(getIsLoading);
  const todos = useSelector(getVisibleTodos);
  const isLoaded = useSelector(getFinishLoading);
  const [isVisible, setIsVisible] = useState(false);

  const loadTodos = () => {
    setIsVisible(!isVisible);
    dispatch(startLoading());

    getPrepareTodos()
      .then(todosFromServer => {
        dispatch(finishLoading());
        dispatch(handleSuccess(todosFromServer));
      })
      .catch(() => {
        dispatch(handleError());
      });
  };

  return (
    <div className="container">
      <h1 className="title is-1">Redux list of todos</h1>

      {(!isVisible && !hasError) && (
        <button
          type="button"
          className="button is-primary is-medium"
          onClick={loadTodos}
        >
          Load
        </button>
      )}

      {isLoading && (
        <Loading isLoaded={isLoaded} />
      )}

      {hasError && (
        <>
          <p>Error occurred!!!</p>
          <button
            type="button"
            className="button is-primary is-medium"
            onClick={loadTodos}
          >
            Try again
          </button>
        </>
      )}
      {isLoaded && (
        <div className="bd-snippet-preview ">
          <table className="table is-striped is-hoverable">
            <thead className="has-background-grey-lighter">
              <SortButtons />
            </thead>
            <tfoot className="has-background-grey-lighter" />
            <tbody>
              <TodoList todos={todos} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
