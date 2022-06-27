import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import {
  getFilteredTodosSelector,
  getUserSelector,
} from '../../store/selectors';

enum FilterOptions {
  all,
  complited,
  active,
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.all);
  const user = useSelector(getUserSelector);
  const filteredTodos = useSelector(getFilteredTodosSelector(query));

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    try {
      const userFromServer = await getUserById(id);

      dispatch(setUserAction(userFromServer));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const visibleTodos = filteredTodos.filter((todo) => {
    switch (filter) {
      case FilterOptions.complited: {
        return todo.completed === true;
      }

      case FilterOptions.active: {
        return todo.completed === false;
      }

      default:
        return todo;
    }
  });

  const url = 'https://mate.academy/students-api/todos';
  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const deleteHandler = (todoId: number) => {
    try {
      fetch(`${url}/${todoId}`, options);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          id="search-query"
          className="TodoList__search"
          value={query}
          placeholder="Type search word"
          onChange={event => setQuery(event.target.value.toLowerCase())}
        />
        <select
          className="TodoList__select"
          onChange={((event) => setFilter(+event.target.value))}
        >
          <option
            value={FilterOptions.all}
          >
            Show all
          </option>
          <option
            value={FilterOptions.complited}
          >
            Show complited
          </option>
          <option
            value={FilterOptions.active}
          >
            Show uncomplited
          </option>
        </select>
        <ul className="TodoList__list">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label>
                <input type="checkbox" readOnly />
                <p className="TodoList__list-paragraph">{todo.title}</p>
              </label>

              <button
                type="button"
                className={classNames(
                  'TodoList__user-button button',
                  {
                    'TodoList__user-button--selected': todo.userId === user?.id,
                  },
                )}
                onClick={() => {
                  getUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
              <button
                type="button"
                className={classNames(
                  'TodoList__user-button button',
                  {
                    'TodoList__user-button--selected': todo.userId === user?.id,
                  },
                )}
                onClick={() => {
                  deleteHandler(todo.id);
                  window.location.reload();
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
