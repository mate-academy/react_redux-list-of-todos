import React from 'react';
import { Status } from '../../types/Status';
import { filterActions } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              dispatch(filterActions.setStatus(event.target.value));
            }}
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
          value={query}
          onChange={event => {
            dispatch(filterActions.setQuery(event.target.value));
          }}
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
              onClick={() => {
                dispatch(filterActions.clearQuery());
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
