import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { SortType } from '../../types/SortType';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as SortType));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const handleClearInput = () => {
    dispatch(filterActions.setClear());
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
            value={status}
            onChange={handleSelect}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="delete"
                onClick={handleClearInput}
              />
            )}
        </span>
      </p>
    </form>
  );
};
