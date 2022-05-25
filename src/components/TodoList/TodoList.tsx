import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosSelector, selectUserIdSelector } from '../../store/selectors';
import { addTodosActionCreator, selectUserIdAction } from '../../store/actions';
import { getTodos } from '../../api';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState('');

  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();
  const selectUserId = (id: number) => dispatch(selectUserIdAction(id));
  const selectedUserId = useSelector(selectUserIdSelector);

  useEffect(() => {
    getTodos()
      .then(res => dispatch(addTodosActionCreator(res)));
  }, []);

  const filterTodos = useMemo(() => (
    todos.filter(todo => {
      const todoTitleToLowerCase = todo.title.toLowerCase();
      const queryToLowerCase = query.toLowerCase();

      return todoTitleToLowerCase.includes(queryToLowerCase);
    })
      .filter(todo => {
        switch (selectedActivities) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'select all':
            return todo;
          default:
            return todo;
        }
      })
  ), [query, todos, selectedActivities]);

  return (
    <div className="TodoList">
      <h2>
        Todos:
      </h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          onChange={
            (event) => setSelectedActivities(event.target.value)
          }
        >
          <option
            value="0"
            disabled
            selected
          >
            select activities
          </option>
          <option>
            active
          </option>
          <option>
            completed
          </option>
          <option>
            select all
          </option>
        </select>
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames('TodoList__item', (todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'
              ))}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>
                  {todo.title}
                </p>
              </label>

              <button
                type="button"
                className={classnames(
                  'TodoList__user-button button',
                  {
                    'TodoList__user-button--selected':
                   selectedUserId === todo.userId,
                  },
                  'button',
                )}
                onClick={() => {
                  selectUserId(todo.userId);
                }}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
