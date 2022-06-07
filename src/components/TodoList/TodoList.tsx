import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodosSelector,
  selectUser,
  deleteTodosAction,
} from '../../store';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTodos, setSelectedTodos] = useState('');

  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  const selectUsers = (userId: number) => dispatch(selectUser(userId));
  const deleteTodos = (id: number) => dispatch(deleteTodosAction(id));

  const getVisibleTodos = () => {
    switch (selectedTodos) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  const filtredTodos = visibleTodos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__box">
        <div className="field">
          <div className="control">
            <input
              type="text"
              id="search-query"
              className="input"
              value={query}
              placeholder="Search"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <label>
          <select
            name="completed"
            onChange={(e) => setSelectedTodos(e.target.value)}
            value={selectedTodos}
          >
            <option value="all">
              All
            </option>
            <option value="Active">
              Not completed
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filtredTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--unchecked': todo.completed === false,
                })}
            >
              <label data-cy="filterByTitle">
                <input type="checkbox" />
                <p>
                  {todo.title}
                </p>
              </label>
              <div className="buttons">
                {todo.userId && (
                  <button
                    className={classNames(
                      'button',
                      {
                        'button--selected':
                          todo.completed === true,
                      },
                    )}
                    type="button"
                    onClick={() => selectUsers(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                )}
                <button
                  type="button"
                  className="button"
                  onClick={() => deleteTodos(todo.id)}
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
