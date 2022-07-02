import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById } from '../../api/api';
import {
  deleteTodoAction,
  setTodosAction,
  setUserAction,
} from '../../store/actions';
import { getFilterTodos } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('all');
  const [filterType, setFilterType] = useState('');
  const dispatch = useDispatch();

  const filteredTodos = useSelector(getFilterTodos(query, filterType));

  useEffect(() => {
    const loadTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(setTodosAction(todosFromServer));
      } catch {
        // eslint-disable-next-line no-console
        console.log('Todos not found');
      }
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    try {
      const userFromServer = await getUserById(id);

      dispatch(setUserAction(userFromServer));
    } catch {
      // eslint-disable-next-line no-console
      console.log('User not found');
    }
  };

  const deleteTodo = async (id: number) => {
    dispatch(deleteTodoAction(id));
  };

  return (
    <div className="TodoList">
      <div className="TodoList__search">
        <h4>Search:</h4>
        <div className="TodoList__search-fields">
          <label className="TodoList__search-label">
            by Title
            <input
              className="TodoList__search-input"
              data-cy="filterByTitle"
              onChange={(e) => {
                setQuery(e.target.value);
                setFilterType('title');
              }}
            />
          </label>
          <label className="TodoList__search-label">
            by Status
            <select
              onChange={(e) => {
                setQuery(e.target.value);
                setFilterType('status');
              }}
              className="TodoList__search-input"
            >
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </label>
        </div>
      </div>
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="TodoList__item TodoList__item--unchecked"
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              <div>
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

                <button
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                  type="button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
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
