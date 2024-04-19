import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const setQuery = (value: string) => dispatch(actions.setQuery(value));
  const setStatus = (value: Status) => dispatch(actions.setStatus(value));

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
            onChange={e => setStatus(e.target.value as Status)}
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
          onChange={e => setQuery(e.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
