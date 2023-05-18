import React, { ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteQuery,
  setQuery,
  setStatus,
  Status,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);

  const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setStatus(event.target.value as Status));
  };

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setQuery(event.target.value as Status));
  };

  const handleQueryDelete = () => {
    dispatch(deleteQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
