import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { todoAction, uploadTodos } from '../../store/todoReducer';
import { RootState } from '../../store';
import { uploadUser } from '../../store/userReducer';
import { User } from '../../type/user';
import { Todo } from '../../type/todo';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('all');

  const todos: Todo[]
    = useSelector((state: RootState) => state.todoReducer.todos);

  const user: User
    = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {
    dispatch(uploadTodos());
  }, []);

  const visibleTodos = useMemo(() => {
    const filtered = todos
      .filter(todo => todo.title.includes(query.trim()
        .toLowerCase()));

    switch (selectedVisibility) {
      case 'all':
        return filtered;

      case 'completed':
        return filtered.filter(todo => todo.completed);

      case 'notCompleted':
        return filtered.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [todos, query, selectedVisibility]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <select
          value={selectedVisibility}
          onChange={(event) => {
            setSelectedVisibility(event.target.value);
          }}
        >
          <option value="all">
            All
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="notCompleted">
            Not Completed
          </option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={`TodoList__item TodoList__item${todo.completed ? '--checked' : '--unchecked'}`}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className={classNames(
                    'TodoList__user-button button',
                    {
                      'TodoList__user-button--selected':
                        user && user.id === todo.userId,
                    },
                  )}
                  type="button"
                  disabled={user && user.id === todo.userId}
                  onClick={() => {
                    dispatch(uploadUser(todo.userId));
                  }}
                >
                  {`User:#${todo.userId}`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(todoAction.deleteTodo(todo.id));
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
