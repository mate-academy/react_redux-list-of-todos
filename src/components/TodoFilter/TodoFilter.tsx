import React from 'react';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.status(event.target.value as Status));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(filterSlice.actions.query(event.target.value))
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.clearQuery())}
            />
          )}
        </span>
      </p>
    </form>
  );
};
