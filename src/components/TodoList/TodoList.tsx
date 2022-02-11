/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos, getUser } from '../../api';
import { loadTodosActions, loadUserActions } from '../../store/actions';
import { getTodosSelector, getUserIdSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getUserIdSelector);

  const handleSelectUser = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserActions(userFromServer));
  };

  const filteredTodos = todos.filter(todo => todo.title.includes(inputValue));

  const visibleTodos = filteredTodos.filter(todo => {
    switch (filterBy) {
      case 'not completed':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosActions(todosFromServer));
    };

    loadTodos();
  }, [todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="field">
        <label className="label">Filter by title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
      </div>

      <div className="select">
        <select
          onChange={(event) => setFilterBy(event.target.value)}
        >
          <option value="all">All</option>
          <option value="not completed">Not completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  id={`${todo.id}`}
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                )}
                type="button"
                onClick={() => selectedUserId !== todo.userId && handleSelectUser(todo.userId)}
              >
                {`User #${todo.userId}`}
              </button>

              <button
                className="TodoList__user-button button"
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
