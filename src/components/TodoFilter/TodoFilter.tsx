import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as filterActions, Payload } from '../../features/filter';

import { Filter } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter: Payload = useSelector<RootState, Payload>(
    state => state.filter,
  );

  const handleFilterChange = (filterValue: string) => {
    switch (filterValue) {
      case 'all':
        dispatch(filterActions.setFilter({
          ...currentFilter,
          status: Filter.all,
        }));
        break;

      case 'active':
        dispatch(filterActions.setFilter({
          ...currentFilter,
          status: Filter.active,
        }));
        break;

      case 'completed':
        dispatch(filterActions.setFilter({
          ...currentFilter,
          status: Filter.completed,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => handleFilterChange(e.target.value)}
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
          value={currentFilter.query}
          onChange={e => dispatch(filterActions.setFilter({
            ...currentFilter,
            query: e.target.value,
          }))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentFilter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.setFilter({
                ...currentFilter,
                query: '',
              }))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
