import React from 'react';
import { filterSlice } from '../../features/filter';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';

export const TodoFilter: React.FC = () => {
  const { setFilterSelect, setFilterSearch } = filterSlice.actions;
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(setFilterSelect(e.target.value))}
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
          onChange={e => dispatch(setFilterSearch(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setFilterSearch(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
