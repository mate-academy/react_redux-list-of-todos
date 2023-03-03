import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as filterActions } from '../../features/filter/actions';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { getFilter } from '../../features/filter/selectors';

import { StatusFilter } from '../../enums/StatusFilter';

const statusFilters = Object.values(StatusFilter);

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(getFilter);

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
            onChange={(event) => {
              return dispatch(
                filterActions.setFilter(event.target.value as StatusFilter),
              );
            }}
          >
            {statusFilters.map((statusFilter) => (
              <option
                key={statusFilter}
                value={statusFilter}
              >
                {capitalizeFirstLetter(statusFilter)}
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
          onChange={(event) => {
            return dispatch(filterActions.setQuery(event.target.value));
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.clearQuery())}
              aria-label="Press Enter to clear the search field"
            />
          </span>
        )}
      </p>
    </form>
  );
};
