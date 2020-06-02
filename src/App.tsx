import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPrepareTodos } from './components/helpers/api';
import './App.scss';
import TodoList from './components/TodoList';
import Loading from './components/Loading';
import ButtonsSort from './components/ButtonsSort';

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
  const loaded = useSelector(getFinishLoading);
  const [isToggle, setIsToggle] = useState(false);

  const loadTodos = () => {
    setIsToggle(!isToggle);
    dispatch(startLoading());

    getPrepareTodos()
      .then(todosFromServe => {
        dispatch(finishLoading());
        dispatch(handleSuccess(todosFromServe));
      })
      .catch(() => {
        dispatch(handleError());
      });
  };

  return (
    <div className="container">
      <h1 className="title is-1">Redux list of todos</h1>

      {(!isToggle && !hasError) && (
        <button
          type="button"
          className="button is-primary is-medium"
          onClick={loadTodos}
        >
          Load
        </button>
      )}

      {isLoading && (
        <Loading loaded={loaded} />
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
      {loaded && (
        <div className="bd-snippet-preview ">
          <table className="table is-striped is-hoverable">
            <thead className="has-background-grey-lighter">
              <ButtonsSort />
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
