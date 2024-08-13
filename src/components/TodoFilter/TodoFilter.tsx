import React from 'react';
import {
  queryReducer,
  statusReducer,
  StatusTypes,
} from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../features/useAppSelector';

export const TodoFilter: React.FC = () => {
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const dispatch = useAppDispatch();
  const setQuery = (value: string) => dispatch(queryReducer(value));
  const setStatus = (value: StatusTypes) => dispatch(statusReducer(value));

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
            onChange={event => {
              setStatus(event.target.value as StatusTypes);
            }}
          >
            <option value={StatusTypes.All}>All</option>
            <option value={StatusTypes.Active}>Active</option>
            <option value={StatusTypes.Completed}>Completed</option>
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
          onChange={event =>
            setQuery(event.target.value.toLowerCase().trimStart())
          }
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
