import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../../types';
import { Filters } from '../Filters';
import classNames from 'classnames';

import {
  getListOfTodos,
  setUserId,
  setUserSelected,
  getSearchQuery,
  getFilterStatus
} from '../../store';
import { isLoading } from '../../store/loading';

import { filters } from '../../helpers';

import './TodoList.scss';

export const TodoList = () => {
  const todos: Todo[] = useSelector(getListOfTodos);
  const dispatch = useDispatch();

  const searchQuery = useSelector(getSearchQuery);
  const filterStatus = useSelector(getFilterStatus);
  const areTodosLoading: boolean = useSelector(isLoading);

  const filterByQuery = (todo: Todo) => {
    if (todo.title !== null) {
      return todo.title.toLowerCase()
        .includes(searchQuery.toLowerCase());
    }

    return null;
  }

  const filterByStatus = (todo: Todo) => {
    switch (filterStatus) {
      case filters.Completed:
        return todo.completed;
      case filters.Active:
        return !todo.completed;
      default:
        return true;
    }
  }

  const filteredTodos = useMemo(() => {
    if (!searchQuery.length) {
      return todos;
    }

    return todos.filter(filterByQuery);
  }, [todos, searchQuery]);

  const sortedTodos = useMemo(() => {
    return filteredTodos.filter(filterByStatus);
  }, [filteredTodos, filterStatus]);

  return (
    <div className="TodoList">
      <h3>Todos:</h3>
      {areTodosLoading ? (
        <p className="info">Loading...</p>
      ) : (
        <div className="TodoList__list-container">
          <Filters />
          <ul className="TodoList__list">
            {sortedTodos.map((todo: Todo) => (
              <li key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setUserId(todo.userId));
                    dispatch(setUserSelected(true));
                  }}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
