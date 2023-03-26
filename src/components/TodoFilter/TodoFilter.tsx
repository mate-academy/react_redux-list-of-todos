import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(e.target.value as Status));
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(e.target.value));
  };

  const handleClearQuery = () => {
    dispatch(filterActions.setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          <button
            aria-label="del-btn"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearQuery}
          />
        </span>
      </p>
    </form>
  );
};
