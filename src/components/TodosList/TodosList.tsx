import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { getTodos, getUser, removeTodo } from '../../api/api';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getTodosSelector, getUserIdSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getUserIdSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, [todos]);

  const handleClick = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <form className="TodoList__form">
        <p>Find todo</p>
        <input
          className="input is-info"
          placeholder="Enter todo title"
          type="text"
        />

        <p>Select todo status</p>
        <div className="select is-info">
          <select
            name="todoStatus"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </form>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__buttons">
                <button
                  className={cn(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => handleClick(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className="button CurrentUser__button"
                  type="button"
                  onClick={() => removeTodo(todo.id)}
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
