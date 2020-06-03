import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setTodosAction } from './store/todos';
import { loadingAction } from './store/loading';
import { loadedAction } from './store/loaded';
import { setErrorMessageAction } from './store/errorMessage';
import { setSortTypeAction } from './store/sortType';
import {
  getTodos,
  getSortType,
  getErrorMessage,
  getLoadedStatus,
  getLoadingStatus,
} from './store';

import './App.scss';

import { getData } from './helpers/getData';

import { TodoList } from './components/TodoList/TodoList';
import { TodoButton } from './components/TodoButton/TodoButton';
import { getSortedTodos } from './helpers/helpers';

const App = () => {
  const dispatch = useDispatch();

  const todos: Todo[] = useSelector(getTodos);
  const isLoading = useSelector(getLoadingStatus)
  const isLoaded = useSelector(getLoadedStatus);
  const sortType = useSelector(getSortType);
  const errorMessage = useSelector(getErrorMessage);

  const handleLoadClick = async () => {
    dispatch(loadingAction(true));

    try {
      const todoList = await getData();

      dispatch(setTodosAction(todoList));
      dispatch(loadedAction(true));

      if (todoList.length === 0) {
        dispatch(setErrorMessageAction('No Todos, try again later.'));
      } else {
        dispatch(setErrorMessageAction(''));
      }
    } catch (exeption) {
      dispatch(setErrorMessageAction('Network error, try again.'));
    }

    dispatch(loadingAction(false));
  }

  const reset = () => {
    dispatch(setSortTypeAction(''));
  }

  const sortListByTitle = () => {
    dispatch(setSortTypeAction('title'));
  }

  const sortListByUser = () => {
    dispatch(setSortTypeAction('author'));
  }

  const sortListByStatus = () => {
    dispatch(setSortTypeAction('status'));
  }

  const sortedTodos = useMemo(() => {
    return getSortedTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <div className="todo">
      <h1 className="todo__title">List of Todos</h1>

      {!isLoaded ? (
        <>
          {errorMessage && <span className="todo__error">{errorMessage}</span>}

          <TodoButton
            title="Load"
            handleClick={handleLoadClick}
            status={isLoading}
          />
        </>
      ) : (
        !errorMessage.length ? (
          <>
            <div className="todo__sort-buttons">
              <TodoButton
                title="Sort by title"
                handleClick={sortListByTitle}
                status={isLoading}
              />
              <TodoButton
                title="Sort by authors"
                handleClick={sortListByUser}
                status={isLoading}
              />
              <TodoButton
                title="Sort by status"
                handleClick={sortListByStatus}
                status={isLoading}
              />
              <TodoButton
                title="Reset"
                handleClick={reset}
                status={isLoading}
              />
            </div>
            <TodoList todoList={sortedTodos} />
          </>
        ) : (
          <>
            <span className="todo__error">{errorMessage}</span>

            <TodoButton
              title="Reload"
              handleClick={handleLoadClick}
              status={isLoading}
            />
          </>
        )
      )}
    </div>
  );
};

export default App;
