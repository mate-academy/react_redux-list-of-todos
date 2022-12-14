import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const updateQueryFilter = (query: string) => {
    dispatch(actionsFilter.filterQueryTodos(query));
  };

  const clearQuery = () => {
    dispatch(actionsFilter.filterQueryTodos(''));
  };

  const updateFilterParam = (status: string) => {
    switch (status) {
      case 'active':
        dispatch(actionsFilter.filterActiveTodos(status));
        break;

      case 'completed':
        dispatch(actionsFilter.filterCompletedTodos(status));
        break;

      case 'all':
        dispatch(actionsFilter.filterAllTodos(status));
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
            onChange={(event) => updateFilterParam(event.target.value)}
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
          value={filter.query}
          onChange={(event) => updateQueryFilter(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clearSearchButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
