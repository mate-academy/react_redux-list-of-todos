import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus, StatusTypes } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const handleQueryChange = (value: string) => {
    dispatch(setQuery(value));
  };

  const handleStatusChange = (value: StatusTypes) => {
    dispatch(setStatus(value));
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
            value={status}
            onChange={event => {
              handleStatusChange(event.target.value as StatusTypes);
            }}
          >
            <option value={StatusTypes.All}>All</option>
            <option value={StatusTypes.Active}>Active</option>
            <option value={StatusTypes.Completed}>Completed</option>
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
          onChange={event => {
            handleQueryChange(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query !== '' && (
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
