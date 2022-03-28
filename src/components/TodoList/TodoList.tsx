import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import './TodoList.scss';
import { TodosActionTypes } from '../../store/reducers/TodosReducer/types';

enum SortBy {
  true = 'true',
  false = 'false',
  default = '',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchTodos, toggleStatusTodo } = useActions();

  const {
    todos,
    error,
    loading,
    selectedUserId,
    statusTodos,
  } = useTypedSelector(state => state.todos);

  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchTodos(statusTodos);
  }, [statusTodos]);

  const getFilteredTodos = (todosToFilter: Todo[], queryForFilter: string): Todo[] => {
    return todosToFilter.filter(todo => {
      const lowerCaseQuery = queryForFilter.toLowerCase();

      return todo.title.toLowerCase().includes(lowerCaseQuery);
    });
  };

  const shuffle = (array: Todo[]): Todo[] => {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  };

  const filteredTodos = getFilteredTodos(todos, query);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__interactive">
        <label htmlFor="search-query" className="label">
          Search todo&nbsp;
          <input
            className="TodoList__interactive-input"
            type="text"
            id="search-query"
            placeholder="Type search todo"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </label>
        <label htmlFor="select-completed">
          Toggle completion status&nbsp;
          <select
            className="TodoList__interactive-input"
            id="select-completed"
            value={statusTodos}
            onChange={(event) => dispatch({
              type: TodosActionTypes.SET_STATUS_TODOS,
              payload: event.target.value,
            })}
          >
            <option value={SortBy.default}>All</option>
            <option value={SortBy.true}>Completed</option>
            <option value={SortBy.false}>Active</option>
          </select>
        </label>
        <span>
          Random todos&nbsp;
          <button
            className="button TodoList__user-button TodoList__user-button--selected"
            type="button"
            onClick={() => dispatch({
              type: TodosActionTypes.FETCH_TODOS_SUCCESS,
              payload: shuffle(todos),
            })}
          >
            Randomize
          </button>
        </span>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                  onChange={() => toggleStatusTodo(todo.id, todo.completed)}
                />
                <p>{todo.title}</p>
              </label>

              <button
                onClick={() => {
                  if (todo.userId !== selectedUserId) {
                    dispatch({ type: TodosActionTypes.SELECT_USER, payload: todo.userId });
                  }
                }}
                className={classNames('button TodoList__user-button',
                  { 'TodoList__user-button--selected': todo.userId === selectedUserId })}
                type="button"
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
