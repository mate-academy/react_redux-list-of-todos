import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodosList from './TodosList';
import './App.scss';
import { todosFromServer } from './API';
import {
  AllActions,
  alphabeticallyName, alphabeticallyTitle, completedTodo,
  InitialState,
  loading,
  setState,
  deleteTodo,
} from './store/store';

const App = () => {
  const dispatch = useDispatch<Dispatch<AllActions>>();
  const todosList = useSelector((state: InitialState) => state.todosList);
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

  let sortedTodos: TodoWithUser[] = [...todosList];
  const sortedOfNames = () => {
    if (!isAlphabeticallyName) {
      sortedTodos = todosList.sort((a, b) => a.user.name.localeCompare(b.user.name));

      return dispatch(alphabeticallyName(true));
    }

    sortedTodos = todosList.sort((a, b) => b.user.name.localeCompare(a.user.name));

    return dispatch(alphabeticallyName(false));
  };

  const sortedOfTitle = () => {
    if (!isAlphabeticallyTitle) {
      sortedTodos = todosList.sort((a, b) => a.title.localeCompare(b.title));

      return dispatch(alphabeticallyTitle(true));
    }

    sortedTodos = todosList.sort((a, b) => b.title.localeCompare(a.title));

    return dispatch(alphabeticallyTitle(false));
  };

  const sortedOfCompleted = () => {
    if (!isCompletedTodo) {
      sortedTodos = todosList.sort((a, b) => Number(a.completed) - Number(b.completed));

      return dispatch(completedTodo(true));
    }

    sortedTodos = todosList.sort((a, b) => Number(b.completed) - Number(a.completed));

    return dispatch(completedTodo(false));
  };

  return (
    <div className="app">
      <h1 className="app__header">Dynamic list of TODOs</h1>
      {todosList.length > 0 && (
        <div className="app__button-filter">
          <button
            type="button"
            onClick={sortedOfNames}
            className="app__button"
          >
            Filter by name
          </button>
          <button
            type="button"
            onClick={sortedOfTitle}
            className="app__button"
          >
            Filter by title
          </button>
          <button
            type="button"
            onClick={sortedOfCompleted}
            className="app__button"
          >
            Filter by complete
          </button>
        </div>
      )}
      <TodosList
        newTodos={sortedTodos}
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
