import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { deleteTodo, getTodos, getUser } from '../../api/api';
import { setTodosAction, setUserByIdAction } from '../../store/actions';
// import { getTodosSelector } from '../../store/selectors';
import './TodoList.scss';
import {
  getFilteredTodosSelector,
  getUserByIdSelector,
} from '../../store/selectors';

enum Options {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const selectedUser = useSelector(getUserByIdSelector);

  const loadTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const getUserById = async (userId: number) => {
    try {
      const user = await getUser(userId);

      dispatch(setUserByIdAction(user));
    } catch (error) {
      dispatch(setUserByIdAction(null));
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const removeTodo = async (todoId: number) => {
    await deleteTodo(todoId);
    const todosFromServer = await getTodos();

    dispatch(setTodosAction(todosFromServer));
  };

  const filteredByTitle = useSelector(getFilteredTodosSelector(title));

  const filteredByStatus = filteredByTitle.filter(todo => {
    switch (status) {
      case Options.all:
        return true;

      case Options.active:
        return !todo.completed;

      case Options.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="all"> All </option>
        <option value="active"> Active </option>
        <option value="completed"> Completed </option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            filteredByStatus.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
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

                <div>
                  <button
                    className={classNames(
                      'TodoList__user-button',
                      {
                        'TodoList__user-button--selected':
                        selectedUser?.id === todo.userId,
                      },
                      'button',
                    )}
                    type="button"
                    onClick={() => {
                      getUserById(todo.userId);
                    }}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => {
                      removeTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
