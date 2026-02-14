import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={e =>
              dispatch(
                filterSlice.actions.setStatus(
                  e.target.value as 'all' | 'active' | 'completed',
                ),
              )
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
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => dispatch(filterSlice.actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
