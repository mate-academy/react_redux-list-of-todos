import React from 'react';
import { RootState } from '../../app/store';
import { actions as filterActions } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.filter);

  return (
    <form
      name="searchQuery"
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => {
              dispatch(filterActions.addStatus(event.target.value));
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
          value={filters.query}
          className="input"
          placeholder="Search..."
          onChange={event => {
            dispatch(filterActions.addQuery(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
