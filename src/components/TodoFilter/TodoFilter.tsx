import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { AppDispatch, RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={event => {
              dispatch(filterSlice.actions.setStatus(event.target.value));
            }}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => {
            dispatch(filterSlice.actions.setQuery(event.target.value));
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => {
                dispatch(filterSlice.actions.clearQuery());
              }}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
