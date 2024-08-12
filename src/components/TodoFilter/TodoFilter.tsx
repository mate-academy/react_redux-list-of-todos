import React from 'react';

import { FilterType } from '../../types/FilterType';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { RootState, useAppSelector } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector((state: RootState) => state.filter.query);

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as FilterType));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeOption}>
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>

            <option value={FilterType.Completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
