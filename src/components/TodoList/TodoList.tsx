import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSelectedTodoId,
  getTodos,
  setSelectedTodoId,
  setSelectedUserId,
} from '../../store';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [todosFilter, setTodosFilter] = useState('all');

  const selectedTodoId = useSelector(getSelectedTodoId);
  const todos = useSelector(getTodos(searchInput, todosFilter));
  const dispatch = useDispatch();

  const onButtonClick = (id: number, userId: number) => {
    dispatch(setSelectedUserId(userId));
    dispatch(setSelectedTodoId(id));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodosFilter(event.target.value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          onChange={onInputChange}
          value={searchInput}
        />

        <select
          value={todosFilter}
          onChange={onSelectChange}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <ul className="TodoList__list">
          {todos.map(todo => {
            const {
              title,
              id,
              completed,
              userId,
            } = todo;
            const isTodoSelected = selectedTodoId === id;

            return (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': completed,
                    'TodoList__item--unchecked': !completed,
                  },
                )}
                key={id}
              >
                <label htmlFor="checkbox">
                  <input
                    id="checkbox"
                    type="checkbox"
                    readOnly
                  />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected': isTodoSelected,
                    },
                    'button',
                  )}
                  type="button"
                  onClick={() => onButtonClick(id, userId)}
                >
                  User&nbsp;#
                  {userId}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
