import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), [
    appliedQuery,
  ]);

  const handleFilterChange = (value: string) => {
    dispatch(filterSlice.actions.filterStatus(value));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  const handleClearSearch = () => {
    setQuery('');
    dispatch(filterSlice.actions.query(''));
  };

  useEffect(() => {
    dispatch(filterSlice.actions.query(appliedQuery));
  }, [dispatch, appliedQuery]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => handleFilterChange(e.target.value)}
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => handleInputChange(e.currentTarget.value)}
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
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
