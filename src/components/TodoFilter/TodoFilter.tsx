import React, { useCallback } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filterDispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case Status.ALL:
          filterDispatch(actions.setStatus(Status.ALL));
          break;

        case Status.ACTIVE:
          filterDispatch(actions.setStatus(Status.ACTIVE));
          break;

        case Status.COMPLETED:
          filterDispatch(actions.setStatus(Status.COMPLETED));
          break;

        default:
          break;
      }
    }, [],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch(actions.setQuery(event.target.value));
  };

  const handleClearSearch = () => {
    filterDispatch(actions.setQuery(''));
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
            onChange={handleSelect}
          >
            {Object.values(Status).map(current => (
              <option value={current}>
                {`${current[0].toUpperCase() + current.slice(1)}`}
              </option>
            ))}
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
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            >
              {}
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
