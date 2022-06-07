import React, { useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  getTodosSelector,
  getUserIdSelector,
  selectUserId,
} from '../../store';

enum Show {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC = () => {
  const todos = useSelector(getTodosSelector);
  const selctedUser = useSelector(getUserIdSelector);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [showTodos, setShowTodos] = useState('');

  const show = () => {
    switch (showTodos) {
      case Show.Active:
        return todos.filter(todo => !todo.completed);
      case Show.Completed:
        return todos.filter(todo => todo.completed);
      case Show.All:
      default:
        return todos;
    }
  };

  const visibleTodos = show()
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        data-cy="filterByTitle"
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <select
        value={showTodos}
        onChange={(event) => setShowTodos(event.target.value)}
      >
        <option value={Show.All}>All</option>
        <option value={Show.Active}>Active</option>
        <option value={Show.Completed}>Completed</option>
      </select>

      <div className="TodoList__list-container">
        <ul data-cy="listOfTodos" className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames({
                TodoList__item: true,
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  data-cy="userButton"
                  onClick={() => dispatch(selectUserId(todo.userId))}
                  className={classNames({
                    'TodoList__user-button button': true,
                    'TodoList__user-button--selected': todo.userId
                      === selctedUser,
                  })}
                  type="button"
                >
                  {`User #${todo.userId}`}
                </button>
                {' '}
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="TodoList__user-button button"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
