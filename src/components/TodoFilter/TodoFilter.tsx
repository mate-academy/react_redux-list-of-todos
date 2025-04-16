import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice, FilterState } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector((state: RootState) => state.filter.query);

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
              dispatch(
                filterSlice.actions.setStatus(
                  e.target.value as FilterState['status'],
                ),
              )
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
          onChange={e => dispatch(filterSlice.actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length !== 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
