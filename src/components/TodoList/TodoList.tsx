import React, { useEffect } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, fetchUserInfo } from '../../api/api';
import { RootState } from '../../types/RootState';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todosReducer.visibleTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', { 'TodoList__item--checked': todo.completed })}
            >
              <label htmlFor="#">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames('TodoList__user-button', 'button', { 'TodoList__user-button--selected': false })}
                type="button"
                onClick={() => {
                  dispatch(fetchUserInfo(todo.userId));
                }}
              >
                {todo.userId ? `User ${todo.userId}` : 'Not user info'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
