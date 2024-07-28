import React from 'react';
import {
  getQuery,
  getStatus,
  setQuery,
  setStatus,
} from '../../features/filter';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
};

export const TodoFilter: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(getQuery);
  const status = useAppSelector(getStatus);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={event => dispatch(setStatus(event.target.value))}
            data-cy="statusSelect"
            value={status}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => dispatch(setQuery(event.target.value))}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch(setQuery(''))}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
