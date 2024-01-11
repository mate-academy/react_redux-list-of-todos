/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const todoFilter = useAppSelector(state => state.filter);
  const setFilter = (status: Status) => {
    dispatch(filterActions.setFilter(status));
  };

  const setQuery = (query: string) => {
    dispatch(filterActions.setQuery(query));
  };

  const filterInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearFilter = () => {
    setQuery('');
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
            value={todoFilter.filter}
            onChange={e => {
              setFilter(e.target.value as Status);
            }}
          >
            <option value={'all' as Status}>All</option>
            <option value={'active' as Status}>Active</option>
            <option value={'completed' as Status}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={todoFilter.query}
          onChange={filterInputHandle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!todoFilter.query.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearFilter}
            />
          )}
        </span>
      </p>
    </form>
  );
};
