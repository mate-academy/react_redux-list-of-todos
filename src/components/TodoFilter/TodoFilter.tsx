import React, { ChangeEvent } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { clearQuery, setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleStatusSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
  };

  const handleQueryClear = () => {
    dispatch(clearQuery());
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
            value={status}
            onChange={handleStatusSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
