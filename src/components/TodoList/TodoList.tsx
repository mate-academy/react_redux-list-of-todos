/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestTodos } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';
import './TodoList.scss';

// eslint-disable-next-line max-len
export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('');
  const dispatch = useDispatch();
  const selectedUserId = useSelector(getUserSelector);
  const todos = useSelector(getTodosSelector);
  const filteredTodos = todos.filter(todo => todo.title.includes(query)).filter(todo => {
    switch (selectQuery) {
      case 'active':
        return todo.completed === false;

      case 'completed':
        return todo.completed === true;

      default:
        return todo;
    }
  });

  useEffect(() => {
    requestTodos().then(response => dispatch(setTodosAction(response)));
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <h2>Ps: users 2 and 8888 do not exist for some reason</h2>

      <input
        data-cy="filterByTitle"
        type="text"
        value={query}
        onChange={
          (event) => {
            setQuery(event.target.value);
          }
        }
        placeholder="Search by title"
      />

      <select value={selectQuery} onChange={(event) => setSelectQuery(event.target.value)}>
        <option value="all">Show all</option>
        <option value="active">Show all uncompleted</option>
        <option value="completed">Show all completed</option>
      </select>

      <div className="TodoList__list-container">

        <ul data-cy="listOfTodos" className="TodoList__list">
          {filteredTodos?.map((todo: Todo) => (
            <li
              key={todo.id}
              className={
                todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'
              }
            >
              <label>
                <input checked={todo.completed} type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                className={
                  selectedUserId === todo.userId
                    // eslint-disable-next-line max-len
                    ? 'TodoList__user-button TodoList__user-button--selected button'
                    : 'TodoList__user-button button'
                }
                type="button"
                onClick={() => {
                  if (todo.userId !== selectedUserId) {
                    return (dispatch(setUserAction(todo.userId)));
                  }

                  return null;
                }}
              >
                User&nbsp;#{todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
