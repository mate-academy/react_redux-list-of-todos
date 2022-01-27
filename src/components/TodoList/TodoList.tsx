import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import classNames from 'classnames';
import { Todos } from '../interfaces';
import { getInputChange, getSort, fetchUser } from '../../store';
import { sortByInput } from '../../store/searchQueryReducer';
import { randomize, checkOnCompletedTodos, removeTodo } from '../../store/todosReducer';
import { setSort } from '../../store/filterReducer';
import { getUsers } from '../../api/api';

type TodoListProps = {
  todos: Todos[];
};

export const TodoList: React.FC<TodoListProps> = ({todos}) => {
  const dispatch = useDispatch();
  const selectOfTodos = [`done`, `undone`];
  const filterTitle = useSelector(getInputChange);
  const selectSort = useSelector(getSort);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="inputs">

        <div className="inputs__item">
          <label htmlFor="search" className="TodoList__label">Search</label>
            <input
            id="search"
              className="TodoList__filter"
              type="text"
              name="filterTitle"
              placeholder="Input the title of todo"
              value={filterTitle}
              onChange={event => dispatch(sortByInput(event.target.value))}
            />
            <span className="bar" />
        </div>

        <div className="inputs__item">
          <label htmlFor="complite">
            Filter
          </label>
          <select
            name="selectTodos"
            value={selectSort}
            onChange={event => dispatch(setSort(event.target.value))}
          >
            <option value="all">
              all
            </option>
            {selectOfTodos.map(todo => (
              <option
                key={todo}
                value={todo}
              >
                {todo}
              </option>
            ))}
          </select>
        </div>

        <div className="inputs__item">
          <button
            className="button"
            type="button"
            onClick={() => dispatch(randomize())}
          >
            Randomize
          </button>
        </div>
      </div>

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked',
            )}
          >
          <div>
            <label>
              <input
                className="TodoList__input"
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(checkOnCompletedTodos(todo.id))}
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            {todo.completed
              ? (
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => dispatch(fetchUser(getUsers, todo.userId))}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              )
              : (
                <button
                  className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                  type="button"
                  onClick={() => dispatch(fetchUser(getUsers, todo.userId))}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              )
            }
            <button
              className="TodoList__beautiful-button"
              type="button"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Remove
            </button>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
