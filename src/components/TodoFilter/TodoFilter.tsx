import React from 'react';
import { actionsFilter } from '../../features/filterTodos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterQuery } from '../../features/queryTodos';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.queryR);

  const handleFilterChange = (filterValue: string) => {
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
          onChange={e => dispatch(filterQuery(e.target.value))}
          value={query}
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
            style={{ visibility: query ? 'visible' : 'hidden' }}
            onClick={() => dispatch(filterQuery(''))}
          />
        </span>
      </p>
    </form>
  );
};
