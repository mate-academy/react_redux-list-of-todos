import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodosList from './TodosList';
import './App.scss';
import { todosFromServer } from './api';
import {
  AllActions,
  InitialState,
  loading,
  setState,
  deleteTodo,
  prepareTodos,
  sortedName, sortedTitle, sortedCompleted,
} from './store/store';

const App = () => {
  const dispatch = useDispatch<Dispatch<AllActions>>();
  const todosList = useSelector((state: InitialState) => state.todosList);
  const todos = useSelector(prepareTodos);
  const isLoading = useSelector((state: InitialState) => state.isLoading);
  const isAlphabeticallyName = useSelector((state: InitialState) => state.isAlphabeticallyName);
  const isAlphabeticallyTitle = useSelector((state: InitialState) => state.isAlphabeticallyTitle);
  const isCompletedTodo = useSelector((state: InitialState) => state.isCompletedTodo);

  const fetchData = (): void => {
    dispatch(loading(true));
    todosFromServer.then(data => {
      dispatch(setState(data, false));
    });
  };

  return (
    <div className="app">
      <h1 className="app__header">Dynamic list of TODOs</h1>
      {todosList.length > 0 && (
        <div className="app__button-filter">
          <button
            type="button"
            onClick={() => dispatch(sortedName('SORTED_NAME', isAlphabeticallyName))}
            className="app__button"
          >
            Filter by name
          </button>
          <button
            type="button"
            onClick={() => dispatch(sortedTitle('SORTED_TITLE', isAlphabeticallyTitle))}
            className="app__button"
          >
            Filter by title
          </button>
          <button
            type="button"
            onClick={() => dispatch(sortedCompleted('SORTED_COMPLETED', isCompletedTodo))}
            className="app__button"
          >
            Filter by complete
          </button>
        </div>
      )}
      <TodosList
        newTodos={todos}
        deleteTodo={deleteTodo}
      />
      {todosList.length === 0
      && (
        <button
          type="button"
          onClick={fetchData}
          className="app__button"
        >
          {isLoading ? 'Loading...' : 'Get Todo'}
        </button>
      )}
    </div>
  );
};

export default App;
