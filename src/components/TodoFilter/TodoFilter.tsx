import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { filterActions, FilterState, SortType } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter: FilterState = useSelector(
    (state: RootState) => state.filter,
  );

  const changeQueryHandler = (text: string) => {
    dispatch(filterActions.setQuery(text));
  };

  const changeSortHandler = (value:SortType) => {
    dispatch(filterActions.setSortType(value));
  };

  const clearQueryHandler = () => {
    dispatch(filterActions.setQuery(''));
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
            onChange={(event) => (
              changeSortHandler(event.target.value as SortType))}
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
          onChange={(event) => (
            changeQueryHandler(event.target.value.toLowerCase()))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentFilter.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => clearQueryHandler()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
