import React from 'react';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatus} value={status}>
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!query.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
