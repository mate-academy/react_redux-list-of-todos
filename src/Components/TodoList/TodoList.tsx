import './TodoList.scss';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTodosSelector, getSelectedUserId } from '../../store/selectors';
import { ACTIONS } from '../../store/actions';
// import { Todo } from '../../types';

export const TodoList:React.FC = () => {
  const { selectUserId } = ACTIONS;
  const [query, setQuery] = useState('');
  const [selectItems, setSelectItems] = useState('');
  // const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getSelectedUserId);
  const dispatch = useDispatch();

  // const visibleTodos = useMemo(() => {
  //   return todos.filter((el) => el.title.toLocaleLowerCase()
  //     .includes(query.toLocaleLowerCase()));
  // }, [todos, query]);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos.filter((el) => el.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));

    if (selectItems === 'Completed') {
      filteredTodos = filteredTodos.filter(item => (item.completed === true));
    }

    if (selectItems === 'Active') {
      filteredTodos = filteredTodos.filter(item => (item.completed === false));
    }

    return filteredTodos;
  }, [todos, query, selectItems]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="filter-bar">
        <label
          htmlFor="search"
          className="search-label"
        >
          Search by title:
          <input
            type="text"
            id="search"
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label
          htmlFor="filter"
          className="filter-label"
        >
          Filter todos:
          <select
            id="filter"
            className="filter-input"
            value={selectItems}
            onChange={(event) => setSelectItems(event.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.length ? (
            <>
              {visibleTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames('TodoList__item',
                    { 'TodoList__item--unchecked': todo.completed === false },
                    { 'TodoList__item--checked': todo.completed === true })}
                >
                  <label htmlFor={`${todo.id}`}>
                    <input
                      type="checkbox"
                      id={`${todo.id}`}
                      defaultChecked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>
                  <div>
                    <button
                      className={classNames(
                        'TodoList__user-button',
                        {
                          'TodoList__user-button--selected':
                          todo.userId === selectedUserId,
                        },
                        'button',
                      )}
                      type="button"
                      onClick={() => dispatch(selectUserId(todo.userId))}
                    >
                      User&nbsp;#
                      {todo.userId}
                    </button>
                    <button
                      className={classNames(
                        'TodoList__user-button',
                        {
                          'TodoList__user-button--selected':
                            todo.userId === selectedUserId,
                        },
                        'button',
                      )}
                      type="button"
                      onClick={() => dispatch(selectUserId(0))}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </>

          ) : <p>No matches found</p>}
        </ul>
      </div>
    </div>
  );
};
