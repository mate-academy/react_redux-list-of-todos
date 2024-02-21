import React, { useState } from 'react';
import { actionsFilter } from '../../features/filterTodos';
import { useAppDispatch } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState('all');

  const handleFilterChange = (filterValue: string, queryArg: string) => {
    setFilterState(filterValue);
    switch (filterValue) {
      case 'all':
        dispatch(actionsFilter.filterAll(queryArg));
        break;
      case 'active':
        dispatch(actionsFilter.filterActive(queryArg));
        break;
      case 'completed':
        dispatch(actionsFilter.filterCompleted(queryArg));
        break;
      default:
        break;
    }
  };

  const handleQuery = (queryValue: string) => {
    setQuery(queryValue);
    handleFilterChange(filterState, queryValue);
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
            onChange={e => handleFilterChange(e.target.value, query)}
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
          onChange={e => handleQuery(e.target.value.toLowerCase())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="delete"
          />
        </span>
      </p>
    </form>
  );
};
