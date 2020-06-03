import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import Start from './components/Start';
import { Finish } from './components/Finish';

import { isLoading, getErrorMessage } from './store';

import { getData } from './helpers/getData';

import { TodoList } from './components/TodoList/TodoList';
import { TodoButton } from './components/TodoButton/TodoButton';
import { getSortedTodos } from './helpers/helpers';

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const todoList = await getData();

      setTodos(todoList);
      setIsLoaded(true);

      if (todoList.length === 0) {
        setErrorMessage('No Todos, try again later.');
      } else {
        setErrorMessage('');
      }
    } catch (exeption) {
      setErrorMessage('Network error, try again.');
    }

    setIsLoading(false);
  }

  const reset = () => {
    setSortType('');
  }

  const sortListByTitle = () => {
    setSortType('title');
  }

  const sortListByUser = () => {
    setSortType('author');
  }

  const sortListByStatus = () => {
    setSortType('status');
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


export const App2 = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getErrorMessage) || 'Ready!';

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish title="Fail loading" message="An error occurred when loading data." />
    </div>
  );
};
