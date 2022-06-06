import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import {
  getSelectedUserByIdSelector,
  getTodosSelector,
} from './store';

import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserByIdSelector);
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [statusTodo, setStatusTodo] = useState('All');
  const [sort, setSort] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      const all = await getTodos();

      dispatch({ type: 'TODOS_LOADING', todos: all });
    };

    getAll();
  }, []);

  const filteredTodos
    = todos.filter(({ title }) => title.toLowerCase()
      .includes(query.toLowerCase()));

  const changeStatusTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusTodo(event.target.value);
  };

  const preparedTodo = () => {
    switch (statusTodo) {
      case 'All':
        return filteredTodos;
      case 'Completed':
        return filteredTodos.filter(({ completed }) => completed);
      case 'Active':
        return filteredTodos.filter(({ completed }) => !completed);

      default:
        return filteredTodos;
    }
  };

  const showTodos = preparedTodo();

  if (!sort) {
    showTodos.sort((tdo1, tdo2) => tdo1.title.localeCompare(tdo2.title));
  }

  useEffect(() => {
    dispatch({ type: 'SELECT_TODO', todos: showTodos });
  }, [showTodos]);

  return (
    <div className="App">

      <div className="App__sidebar">
        <form className="App__form">
          <input
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            type="text"
            id="search-query"
            className="App__input"
            placeholder="find todo"
            data-cy="filterByTitle"
          />

          <select
            name="todoFilter"
            value={statusTodo}
            className="App__select"
            onChange={changeStatusTodo}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Active</option>
          </select>
        </form>

        <button
          type="button"
          className="App__sortButton"
          onClick={() => setSort(!sort)}
        >
          {sort ? 'Sort' : 'UnSort'}
        </button>

        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
