/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Status, actions as filterActions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            defaultValue={Status.All}
            onChange={(event) => {
              dispatch(filterActions.setStatus(event.target.value as Status));
            }}
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
          value={query}
          placeholder="Search..."
          onChange={(event) => dispatch(filterActions.setQuery(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="button"
              className="delete"
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
