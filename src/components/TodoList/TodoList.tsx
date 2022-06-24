import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import './TodoList.scss';

import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';

import { getTodos, getUser } from '../../api/api';

import { Todo } from '../../react-app-env';

export const TodoList: React.FC = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const selectedUser = useSelector(getUserSelector);

  const todos = useSelector(getTodosSelector);
  const filteredTodos = todos.filter(todo => todo.title.includes(title));

  const filteredTodosByStatus = (allTodos: Todo[]) => {
    switch (status) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUserById = async (userId: number) => {
    const user = await getUser(userId);

    dispatch(setUserAction(user));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <p>Filter todos by title</p>
        <input
          type="text"
          value={title}
          data-cy="filterByTitle"
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
        <p>Filter todos by status</p>
        <select
          onChange={({ target }) => {
            setStatus(target.value);
          }}
        >
          <option value="all">
            All todos
          </option>
          <option value="active">
            Active todos
          </option>
          <option value="completed">
            Completed todos
          </option>
        </select>
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodosByStatus(filteredTodos).map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected':
                    selectedUser?.id === todo.userId,
                })}
                type="button"
                onClick={() => {
                  getUserById(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
