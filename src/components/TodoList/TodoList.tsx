import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './TodoList.scss';
import classNames from 'classnames';

import { getAllTodos } from '../../api/todos';
import { loadTodosAction, setUserId } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getAllTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getFilteredTodos = useMemo(() => {
    return todos.filter(todo => todo.title.toLowerCase().includes(query));
  }, [todos, query]);

  let visibleTodos = getFilteredTodos;

  visibleTodos = visibleTodos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return 0;
    }
  });

  return (
    <div className="TodoList">
      <h2 className="subtitle pb-2">Todos:</h2>
      <div className="control pb-2">
        <input
          type="text"
          id="search-query"
          className="input"
          placeholder="Search by title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="select is-info">
        <select
          value={filterBy}
          onChange={(event) => setFilterBy(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container pt-2">
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
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>

              <button
                className="
                  TodoList__user-button
                  button
                  TodoList__user-button--selected
                "
                type="button"
                onClick={() => dispatch(setUserId(+todo.userId))}
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
