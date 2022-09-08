import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FILTER_ACTIONS_CREATOR } from '../../features/filter';
import { SELECTORS } from '../../features/Selectors';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(SELECTORS.query);
  const status = useAppSelector(SELECTORS.status);
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
            onChange={(event) => dispatch(
              FILTER_ACTIONS_CREATOR.setStatus(event.target.value as Status),
            )}
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
          value={query}
          onChange={(event) => dispatch(
            FILTER_ACTIONS_CREATOR.setQuery(event.target.value),
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(FILTER_ACTIONS_CREATOR.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
