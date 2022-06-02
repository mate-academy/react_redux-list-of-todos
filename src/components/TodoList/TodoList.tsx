import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodoAC,
  selectUserIdAC,
  selectUserIdSelector,
} from '../../store';
import { removeTodo } from '../../api/api';

type Props = {
  todos: Todo[],
};

enum Status {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const [query, setQuery] = useState('');
  const [todosStatus, setTodosStatus] = useState('');

  const dispatch = useDispatch();
  const selectedUserId = useSelector(selectUserIdSelector);

  const onFilterByTitleHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onTodoSelectHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTodosStatus(e.target.value);
  };

  const onSelectUserIdHandle = (userId: number) => {
    dispatch(selectUserIdAC(userId));
  };

  const onDeleteTodoHandle = async (id: number) => {
    await removeTodo(id);

    dispatch(deleteTodoAC(id));
  };

  const filterByTitle = () => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  };

  const preparingTodos = () => {
    const filteredByTitle = filterByTitle();

    switch (todosStatus) {
      case Status.Completed: {
        return filteredByTitle.filter(todo => todo.completed);
      }

      case Status.Active: {
        return filteredByTitle.filter(todo => !todo.completed);
      }

      default:
        return filteredByTitle;
    }
  };

  const visibleTodos = preparingTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <label>
          {'Filter by title: '}
          <input
            data-cy="filterByTitle"
            type="text"
            value={query}
            onChange={onFilterByTitleHandleChange}
          />
        </label>

        <select
          className="TodoList__select"
          onChange={onTodoSelectHandleChange}
        >
          <option value={Status.All}>
            All
          </option>
          <option value={Status.Active}>
            Active
          </option>
          <option value={Status.Completed}>
            Completed
          </option>
        </select>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label>
                <input type="checkbox" checked readOnly />
                <p>{todo.title}</p>
              </label>

              {todo.userId && (
                <div className="action-buttons">
                  <button
                    data-cy="userButton"
                    className={classNames('TodoList__user-button button', {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    })}
                    type="button"
                    onClick={() => onSelectUserIdHandle(todo.userId)}
                  >
                    {`User ${todo.userId}`}
                  </button>

                  <button
                    type="button"
                    className="button button--delete"
                    onClick={() => onDeleteTodoHandle(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
