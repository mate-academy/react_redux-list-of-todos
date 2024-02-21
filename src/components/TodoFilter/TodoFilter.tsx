import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { TodoFilterStatus } from '../../types/Enum';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleStatusUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(e.target.value as TodoFilterStatus));
  };

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(e.target.value));
  };

  const handleQueryClear = () => {
    dispatch(filterActions.clearQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusUpdate}>
            <option value={TodoFilterStatus.ALL}>All</option>
            <option value={TodoFilterStatus.UNCOMPLETED}>Active</option>
            <option value={TodoFilterStatus.COMPLETED}>Completed</option>
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
          onChange={handleSearchQuery}
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
