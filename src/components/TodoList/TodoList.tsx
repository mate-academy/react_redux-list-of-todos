import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { Todo } from '../../react-app-env';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [completedTodos, setCompletedTodos] = useState('all');

  const todos = useSelector(getTodosSelector);

  const filteredTitleTodos = todos.filter(todo => todo.title.includes(query));

  const filteredCompletedTodos = (allTodos: Todo[]) => {
    switch (completedTodos) {
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

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <select
        value={completedTodos}
        onChange={(event) => setCompletedTodos(event.target.value)}
      >
        <option
          value="all"
        >
          all
        </option>
        <option
          value="active"
        >
          active
        </option>
        <option
          value="completed"
        >
          completed
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredCompletedTodos(filteredTitleTodos).map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  getUser(todo.userId);
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
