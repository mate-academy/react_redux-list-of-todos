import React from 'react';
import { useAppSelector } from '../../app/store';
import { actions, filterSelector } from '../../features/filter';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            value={filter.status}
            onChange={e =>
              dispatch(actions.setStatusFilter(e.target.value as Status))
            }
            data-cy="statusSelect"
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={e => dispatch(actions.setSearchQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.resetFilters())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
