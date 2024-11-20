import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { changeQuery, changeStatus, resetQuery } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteQuery = () => {
    dispatch(resetQuery());
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeStatus(e.target.value as Status));
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeQuery(e.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeStatus}>
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
          value={filter.query}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteQuery}
            />
          )}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        </span>
      </p>
    </form>
  );
};
