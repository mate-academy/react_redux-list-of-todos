import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const memoizedStatus = useMemo(() => status, [status]);
  const memoizedQuery = useMemo(() => query, [query]);

  const setFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const clearQuery = () => {
    dispatch(setQuery(''));
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
            onChange={setFilter}
            value={memoizedStatus}
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
          onChange={handleOnChange}
          value={memoizedQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
