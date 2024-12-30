import React from 'react';
import { FilterTypes } from '../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions } from '../../features/filter';
import { Status } from '../../types/';

export const TodoFilter: React.FC = () => {
  const { All, Active, Completed } = FilterTypes;
  const { changeStatus, addQuery, clearQuery } = actions;

  const dispatch = useDispatch();
  const { query, status } = useSelector((state: RootState) => state.filter);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeStatus(event.target.value as Status));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addQuery(event.target.value as string));
  };

  const handleClearSearch = () => {
    dispatch(clearQuery());
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
            onChange={handleStatusChange}
          >
            <option value={All}>All</option>
            <option value={Active}>Active</option>
            <option value={Completed}>Completed</option>
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
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: query ? 'auto' : 'none' }}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      </p>
    </form>
  );
};
