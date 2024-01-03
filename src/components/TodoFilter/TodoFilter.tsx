import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Status, actions as todosActions } from '../../features/todos';
import { actions as filterActions } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';

type T = {
  todos: Todo[];
};

export const TodoFilter: React.FC<T> = ({ todos }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(filterActions.query(''));
  }, [dispatch]);

  if (filter) {
    switch (filter.status as Status) {
      case 'todos/ACTIVE':
        dispatch(todosActions.active(todos, filter.query));
        break;
      case 'todos/COMPLETED':
        dispatch(todosActions.completed(todos, filter.query));
        break;
      default:
        dispatch(todosActions.all(todos, filter.query));
        break;
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => {
    if (typeof event === 'string') {
      dispatch(filterActions.query(event));
      setValue(event);
    } else if (typeof event.target.value === 'string') {
      dispatch(filterActions.query(event.target.value));
      setValue(event.target.value);
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => dispatch(filterActions
              .status(event.target.value as Status))}
          >
            <option value="todos/ALL">All</option>
            <option value="todos/ACTIVE">Active</option>
            <option value="todos/COMPLETED">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={(event) => handleInputChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value !== ''.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInputChange('')}
              aria-label="Clear Search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
