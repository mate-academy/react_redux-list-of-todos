import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterBy = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const handleSelect = (value: 'all' | 'active' | 'completed') => {
    dispatch(filterSlice.actions.setStatus(value));
  };

  const handleSearch = (value: string) => {
    dispatch(filterSlice.actions.setQuery(value));
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
            value={filterBy}
            onChange={e =>
              handleSelect(e.target.value as 'all' | 'active' | 'completed')
            }
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
          onChange={e => handleSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
