import React from 'react';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { useDispatch } from 'react-redux';

export const TodoFilter: React.FC = () => {
  // const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (currentValue: Status | string) => {
    if (
      currentValue === Status.Active ||
      currentValue === Status.All ||
      currentValue === Status.Completed
    ) {
      dispatch(filterActions.setStatus(currentValue));
    } else {
      dispatch(filterActions.setQuery(currentValue));
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
            value={filter.status}
            data-cy="statusSelect"
            onChange={event => handleFilterChange(event.target.value as Status)}
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
          value={filter.query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => handleFilterChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleFilterChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
