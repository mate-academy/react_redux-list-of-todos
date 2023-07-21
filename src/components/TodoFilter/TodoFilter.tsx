import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions } from '../../features/filter';
import { SelectValue } from '../../types/SelectValues';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const setQuery = (setToQuery: string) => dispatch(
    filterActions.setQuery(setToQuery),
  );
  const setStatus = (setToStatus: string) => dispatch(
    filterActions.setStatus(setToStatus),
  );
  const clearQuery = () => dispatch(filterActions.remove());
  const { query, status } = useAppSelector(state => state.filter);

  const handleChangeQuery = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const handleChangeSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setStatus(e.target.value as SelectValue);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeSelect}
            value={status}
          >
            {Object.entries(SelectValue).map(([key, value]) => (
              <option
                key={value}
                value={value}
              >
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
          name="search"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="Close button"
              data-cy="clearSearchButton"
              name="clearButton"
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
