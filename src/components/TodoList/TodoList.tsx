import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import { deleteTodo } from '../../store';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
};

enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
}) => {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState(`${Filter.All}`);

  const filteredByTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const changedFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const filteredTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      const titleLowerCase = title.toLowerCase();

      return titleLowerCase.includes(query.toLowerCase());
    });

    switch (filterStatus) {
      case Filter.Active:
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case Filter.Completed:
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = filteredTodos();

  const dispatch = useDispatch();

  const removeTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todoList">
      <h2 className="todoList__title">
        Todos:
      </h2>
      <div className="todoList__navigation">
        <h3>
          Filter:
        </h3>

        <label>
          <input
            className="todoList__navigationInput"
            type="text"
            value={query}
            onChange={filteredByTitle}
          />
        </label>

        <h3>
          Select status:
        </h3>
        <select
          value={filterStatus}
          onChange={changedFilterStatus}
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
                  onClick={() => removeTodo(id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
