import React from 'react';

import { OptionValue } from '../../types/OptionValue';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={
              event => dispatch(filterActions
                .setStatus(event.target.value as OptionValue))
            }
            data-cy="statusSelect"
          >
            <option value={OptionValue.All}>All</option>
            <option value={OptionValue.Active}>Active</option>
            <option value={OptionValue.Completed}>Completed</option>
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
          onChange={
            (event) => dispatch(filterActions.setQuery(event.target.value))
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.resetFilterQuery())}
            >
              {}
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
