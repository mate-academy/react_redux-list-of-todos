import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/enums';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (
      value === Status.All ||
      value === Status.Active ||
      value === Status.Completed
    ) {
      dispatch(filterSlice.actions.filterByStatus(value));
    } else {
      dispatch(filterSlice.actions.filterByStatus(Status.All));
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChange}
            value={filter.status}
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
          value={filter.query}
          className="input"
          placeholder="Search..."
          onChange={event =>
            dispatch(filterSlice.actions.filterByQuery(event.target.value))
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.filterByQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
