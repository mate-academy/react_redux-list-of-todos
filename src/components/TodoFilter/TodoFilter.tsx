import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';
import { AppDispatch, RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const { query } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e =>
              dispatch(filterSlice.actions.status(e.target.value as Status))
            }
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
          onChange={e => dispatch(filterSlice.actions.query(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.query(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
