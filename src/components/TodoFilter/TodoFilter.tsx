import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [currentQuery, setCurrentQuery] = useState(query);

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterActions.setFilter(event.target.value as Status));
    },
    [dispatch],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setCurrentQuery(newQuery);
      dispatch(filterActions.setQuery(newQuery));
    },
    [dispatch],
  );

  const handleClearQuery = useCallback(() => {
    setCurrentQuery(''); // Clear the currentQuery state
    dispatch(filterActions.clearQuery()); // Clear the query in Redux store
  }, [dispatch]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          value={currentQuery} // Set input value to currentQuery state
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {currentQuery.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
