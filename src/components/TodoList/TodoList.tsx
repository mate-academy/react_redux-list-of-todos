/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { todosActions, todoSelectors } from '../../store/todos';
import { userActions, userSelectors } from '../../store/user';
import { filterSelectors } from '../../store/filter';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todoSelectors.getTodos);
  const filter = useSelector(filterSelectors.getFilter);

  const selectedUserId = useSelector(userSelectors.getUserId);

  const selectUser = (userId: number) => {
    if (userId !== selectedUserId) {
      dispatch(userActions.loadUser(userId));
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(todosActions.checkTodo(todo.id))}
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === 0 || todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                  )}
                  type="button"
                  onClick={() => dispatch(todosActions.deleteTodo(todo.id, filter))}
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
