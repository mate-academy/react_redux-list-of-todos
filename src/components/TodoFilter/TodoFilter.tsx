import { useDispatch } from 'react-redux';
import React from 'react';
import { Filter } from '../../types/Filter';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);

  const setFilter = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => dispatch(filterActions.filterByStatus(
    e.target.value as Filter,
  ));

  const setQuery = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => dispatch(filterActions.filterByQuery(
    e.target.value,
  ));

  const resetQuery = () => dispatch(
    filterActions.filterByQuery(''),
  );

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            name="filterBy"
            data-cy="statusSelect"
            value={filter.status}
            onChange={setFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="input"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={setQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}

      </p>
    </form>
  );
};
