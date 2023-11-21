import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actions as filterActions } from 'features/filter';

import { CompletionStatus } from 'types/CompletionStatus.enum';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, filter } = useAppSelector((state) => state.filter);

  const setQuery = (searchData: string) => dispatch(
    filterActions.setQuery(searchData),
  );
  const clearQuery = () => dispatch(
    filterActions.clearQuery(),
  );
  const setFilter = (currentFilter: CompletionStatus) => dispatch(
    filterActions.selectFilter(currentFilter),
  );

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={
              (event) => setFilter(event.target.value as CompletionStatus)
            }
            data-cy="statusSelect"
          >
            {Object.entries(CompletionStatus).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="clear"
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
