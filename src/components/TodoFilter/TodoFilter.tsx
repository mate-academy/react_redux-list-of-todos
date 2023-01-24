import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { TodoStatus } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const { query } = filter;

  const handlStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'all' || value === 'active' || value === 'completed') {
      dispatch(filterActions.setStatus(value));
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlStatusChange}
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.ACTiVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
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
          onChange={(event) => dispatch(
            filterActions.setQuery(event.target.value),
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="clear"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
