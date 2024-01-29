import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { statuses } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();

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
            onChange={(e) => dispatch(filterActions.setStatus(e.target.value))}
          >
            {statuses.map(currStatus => (
              <option
                value={currStatus}
                key={currStatus}
              >
                {currStatus.charAt(0).toUpperCase() + currStatus.slice(1)}
              </option>
            ))}
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
          onChange={(e) => dispatch(filterActions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => dispatch(filterActions.setQuery(''))}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
