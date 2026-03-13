import React, { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { actions as filterAction } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => ({
    query: state.filter.query,
    status: state.filter.status,
  }));

  const inputHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterAction.setQuery(e.target.value));
  };

  const selectHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterAction.setStatus(e.target.value));
  };

  const clearInput = () => {
    dispatch(filterAction.clearQuery());
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={onSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={selectHandleChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={inputHandleChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={clearInput}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
