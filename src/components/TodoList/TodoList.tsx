import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../../api';
import './TodoList.scss';

import { actions, selectors } from '../../store';

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(`${Status.All}`);
  const [sort, setSort] = useState(false);

  const todos = useSelector(selectors.loadTodos);
  const selectedUserId = useSelector(selectors.getUserId);

  const dispatch = useDispatch();

  const todosFilterByStatus = () => {
    const filteredTodos = todos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });

    switch (status) {
      case Status.Active:
        return filteredTodos.filter(({ completed }) => !completed);

      case Status.Completed:
        return filteredTodos.filter(({ completed }) => completed);

      default:
        return filteredTodos;
    }
  };

  const sortList = (arr: Todo[]) => {
    return [...arr]
      .sort((x, y) => (x.title).localeCompare(y.title));
  };

  const todosForRender = sort
    ? sortList(todosFilterByStatus())
    : todosFilterByStatus();

  const handleRemoveTodo = async (id: number) => {
    await removeTodo(id);

    dispatch(actions.deleteTodo(id));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <p>Search by title</p>
      <label>
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </label>
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="TodoList__select"
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <button
        type="button"
        className="TodoList__additionButton"
        onClick={() => setSort(state => !state)}
      >
        Sort
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {todosForRender.map(({
            userId,
            completed,
            title,
            id,
          }) => (
            <li
              className={`TodoList__item TodoList__item--${completed}`}
              key={id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  disabled
                />
                <p>{title}</p>
              </label>

              <div>
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                    userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => dispatch(actions.selectUser(userId))}
                >
                  {userId ? `User ${userId}` : 'No user'}
                </button>

                <button
                  type="button"
                  onClick={() => handleRemoveTodo(id)}
                  className="TodoList__deleteButton button"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
