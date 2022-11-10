/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import './TodoList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosByStatus, getUserById, remove } from '../../api/api';

import {
  setStatus, setQuery, getTodosByQuery, loadTodos, changeCheckBoxStatus,
} from '../../store/todo/actions';

import { loadUser } from '../../store/user/actions';

import {
  getStatusSelector, getQuerySelector, getTodosSelector,
} from '../../store/todo/selectors';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector(getStatusSelector);
  const query = useSelector(getQuerySelector);
  const todos = useSelector(getTodosSelector);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
    dispatch(getTodosByQuery(event.target.value));
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value));
  };

  const handleClick = async (userId: number) => {
    const userFromServer = await getUserById(userId);

    dispatch(loadUser(userFromServer));
  };

  const loadTodosFromServer = async () => {
    const todosFromServer = await getTodosByStatus(status);

    dispatch(loadTodos(todosFromServer));
  };

  const handleDelete = async (userId: number) => {
    await remove(userId);
    await loadTodosFromServer();
  };

  useEffect(() => {
    loadTodosFromServer();
  }, [status]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <form className="ui form">
        <div className="two fields">
          <div className="field">
            <label>Type search word</label>
            <input
              type="text"
              id="search-query"
              placeholder="Type search word"
              value={query}
              onChange={handleChangeQuery}
            />
          </div>
          <div className="field">
            <label>Choose status</label>
            <select
              className="ui fluid dropdown"
              value={status}
              onChange={handleChangeStatus}
            >
              <option value="all"> All </option>
              <option value="false"> Active </option>
              <option value="true"> Completed </option>
            </select>
          </div>
        </div>
      </form>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={classNames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  defaultChecked={todo.completed}
                  onChange={() => dispatch(changeCheckBoxStatus(todo.id))}
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className={classNames({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected': todo.completed,
                  })}
                  type="button"
                  onClick={() => handleClick(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => handleDelete(todo.id)}
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
