import './App.scss';
import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromServer } from './helpers/api';
import {
  startLoadingData,
  handleSuccessLoading,
  handleErrorLoading,
  RootState,
  handleSort,
} from './store';

import { ToDoList } from './components/ToDoList';

const App = () => {
  const tasks = useSelector((state: RootState) => state.todos);
  const hasError = useSelector((state: RootState) => state.hasError);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const sortType = useSelector((state: RootState) => state.sortType);
  const dispatch = useDispatch();

  const handleLoadClick = async () => {
    try {
      dispatch(startLoadingData());
      const res = await getDataFromServer();
      const [users, todos] = res;
      const preparedTodos = todos.map((task: ToDo) => ({
        ...task,
        user: users.find((user: User) => user.id === task.userId),
      }));

      dispatch(handleSuccessLoading(preparedTodos));
    } catch {
      dispatch(handleErrorLoading());
    }
  };

  const getSortedTodos = useCallback((typeOfSort: string) => {
    switch (typeOfSort) {
      case 'title':
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
      case 'completness':
        return [...tasks].sort((a, b) => (Number(a.completed) - Number(b.completed)));
      case 'name':
        return [...tasks].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return tasks;
    }
  }, [tasks]);

  const visibleTodos = useMemo(() => {
    return getSortedTodos(sortType);
  }, [sortType, getSortedTodos]);

  return (
    <div className="App">
      {hasError && <h1>Some errors appeared. Please, try again</h1>}
      {tasks.length === 0 ? (
        <button
          className="button"
          type="button"
          onClick={handleLoadClick}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <button
            type="button"
            className="button"
            onClick={() => dispatch(handleSort('title'))}
          >
            Sort By Title
          </button>
          <button
            type="button"
            className="button"
            onClick={() => dispatch(handleSort('completness'))}
          >
            Sort By Status
          </button>
          <button
            type="button"
            className="button"
            onClick={() => dispatch(handleSort('name'))}
          >
            Sort By Name
          </button>
          <div className="container">
            <ToDoList todos={visibleTodos} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
