import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { deleteTodo } from '../../store';

import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
  selectUser: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
}) => {
  const [query, setQuery] = useState('');
  const [statusOfTodo, setStatusOfTodo] = useState('all');

  const filterTodosByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const changeStatusOfTodo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusOfTodo(event.target.value);
  };

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      const titleLowerCase = title.toLowerCase();

      return titleLowerCase.includes(query.toLowerCase());
    });

    switch (statusOfTodo) {
      case 'Active':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'Completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  const dispatch = useDispatch();

  const delTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todoList">
      <div className="todoList__navigation">
        <h2>
          Todos:
        </h2>

        <h3>
          Filter by title:
        </h3>

        <label>
          <input
            className="todoList__navigationInput"
            type="text"
            value={query}
            onChange={filterTodosByTitle}
          />
        </label>

        <h3>
          Select todo status:
        </h3>
        <select
          value={statusOfTodo}
          onChange={changeStatusOfTodo}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="todoList__list-container">
        <ul className="todoList__list">
          {preparedTodos.map(({
            userId,
            id,
            title,
            completed,
          }) => (
            <li
              className={classnames(
                'todoList__item',
                { 'todoList__item--checked': completed },
                { 'todoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <div className="todoList__actions">
                <button
                  type="button"
                  className="todoList__button"
                  onClick={() => selectUser(userId)}
                >
                  {`User ${userId}`}
                </button>

                <button
                  type="button"
                  className="todoList__button"
                  onClick={() => delTodo(id)}
                >
                  Delete Todo
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
