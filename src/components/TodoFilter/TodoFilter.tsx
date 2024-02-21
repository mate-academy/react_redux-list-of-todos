import React, { useState } from 'react';
import { actionsFilter } from '../../features/filter';
import { useAppDispatch } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filterState, setFilterState] = useState('');

  const handleFilterChange = (filterValue: string) => {
    setFilterState(filterValue);
    switch (filterValue) {
      case 'all':
        dispatch(actionsFilter.filterAll());
        break;
      case 'active':
        dispatch(actionsFilter.filterActive());
        break;
      case 'completed':
        dispatch(actionsFilter.filterCompleted());
        break;
      default:
        break;
    }
  };

  const handleQueryChange = (queryValue: string) => {
    handleFilterChange(filterState);
    dispatch(actionsFilter.filterQuery(queryValue));
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => handleQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
