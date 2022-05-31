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

export const App: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserByIdSelector);
  const todos = useSelector(getTodosSelector);
  const dispstch = useDispatch();
  const [query, setQuery] = useState('');
  const [statusTodo, setStatusTodo] = useState('All');

  useEffect(() => {
    const getAll = async () => {
      const all = await getTodos();

      dispstch({ type: 'TODOS_LOADING', todos: all });
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

  return (
    <div className="App">

      <div className="App__sidebar">
        <form className="App__form">
          <p>Select Todos</p>
          <input
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            type="text"
            id="search-query"
            className="App__input"
            placeholder="Type key-word"
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

        <TodoList
          todos={showTodos}
        />
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
