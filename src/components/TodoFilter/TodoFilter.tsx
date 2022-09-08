import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERS_ACTIONS_CREATOR } from '../../features/filter';
import { SELECTORS } from '../../selectors/selectors';
import { FilterTypes } from '../../types/FilterTypes';

export const TodoFilter: React.FC = () => {
  const filters = useSelector(SELECTORS.filterSelector);
  const dispatch = useDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filters.status}
            onChange={e => dispatch(
              FILTERS_ACTIONS_CREATOR.setFilter(e.target.value as FilterTypes),
            )}
          >
            <option value={FilterTypes.All}>All</option>
            <option value={FilterTypes.Active}>Active</option>
            <option value={FilterTypes.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filters.query}
          onChange={(e) => dispatch(
            FILTERS_ACTIONS_CREATOR.setQuery(e.target.value),
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(
                FILTERS_ACTIONS_CREATOR.setQuery(''),
              )}
            />
          </span>
        )}
      </p>
    </form>
  );
};
