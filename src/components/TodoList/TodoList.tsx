import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import classNames from 'classnames';
import { Todos } from '../interfaces';
import {
  checkOnCompletedTodos,
  chooseUserId,
  setSort,
  randomize,
  removeTodo,
  sortByInput,
  getInputChange,
  getSort,
} from '../../store';

type TodoListProps = {
  todos: Todos[];
};

export const TodoList: React.FC<TodoListProps> = ({todos}) => {
  const dispatch = useDispatch();

  const selectOfTodos = [`COMPLETED`, `NOT_COMPLETED`];
  const filterTitle = useSelector(getInputChange);
  const selectSort = useSelector(getSort);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="App__input">
        <label className="filterByTitle">
          <input
            className="filterByTitle"
            type="text"
            name="filterTitle"
            placeholder="put name of todo"
            value={filterTitle}
            onChange={event => dispatch(sortByInput(event.target.value))}
          />
          <span className="bar" />
        </label>

      </div>
      <div className="App__select">

        <label htmlFor="complite">
          Filter todos by select methods
        </label>
        <select
          name="selectTodos"
          value={selectSort}
          onChange={event => dispatch(setSort(event.target.value))}
        >
          <option value="ALL">
            ALL
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
      <div className="button__container">
              <button
                className="button"
                type="button"
                onClick={() => dispatch(randomize())}
              >
                Randomize
              </button>
            </div>

      <ul>
        { todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked',
            )}
          >
            <label>
              <input
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
                  onClick={() => dispatch(chooseUserId(todo.userId))}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              )
            }
            <button
              className="beautiful.button"
                type="button"
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                Remove
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
