import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { useAppSelector } from '../../app/store';
import { Filter } from '../../types/Filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useDispatch();

  const handleSelect = (value: Filter) => {
    dispatch(filterSlice.actions.setFilter(value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => handleSelect(e.target.value as Filter)}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          onChange={e => {
            dispatch(filterSlice.actions.setQuery(e.target.value));
          }}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query !== '' ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.clearQuery())}
            />
          </span>
        ) : (
          ''
        )}
      </p>
    </form>
  );
};
