import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;

    dispatch(filterSlice.actions.setStatus(newStatus));
  };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value as string;

    dispatch(filterSlice.actions.setQuery(newQuery));
  };

  const clearInput = () => {
    dispatch(filterSlice.actions.clearQuery());
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
            onChange={onChangeStatus}
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
          value={query}
          placeholder="Search..."
          onChange={onChangeQuery}
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
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
