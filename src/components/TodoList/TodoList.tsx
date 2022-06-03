import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import classNames from 'classnames';
import {
  getSelectedUserByIdSelector,
  getSelectedTodosSelector,
} from '../../store';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(getSelectedUserByIdSelector);
  const todos = useSelector(getSelectedTodosSelector);

  const selectUser = useCallback((userId: number) => {
    dispatch({ type: 'SELECT_ID', id: userId });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TODO', id });
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {todos.map(({
            userId,
            title,
            completed,
            id,
          }) => (
            <li
              key={id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
            >
              <label>
                <input type="checkbox" checked={completed} readOnly />
                <p>{title}</p>
              </label>
              {userId && (
                <div>
                  <button
                    className={classNames(
                      'TodoList__user-button', 'button',
                      {
                        'TodoList__user-button--selected': selectedUserId
                       === userId,
                      },
                    )}
                    type="button"
                    data-cy="userButton"
                    value={userId}
                    onClick={() => selectUser(userId)}
                  >
                    {`User #${userId}`}
                  </button>

                  <button
                    type="button"
                    className="TodoList__user-button button"
                    onClick={() => deleteTodo(id)}
                  >
                    X
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
