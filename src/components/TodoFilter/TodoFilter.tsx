// src/components/TodoFilter/TodoFilter.tsx
import React, { FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setQuery,
  setStatus,
  clearQuery,
  StatusFilter,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(e.target.value as StatusFilter));
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearQuery());
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      {/* Селект: All / Active / Completed */}
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

      {/* Поле пошуку */}
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChangeQuery}
        />

        {/* Іконка пошуку зліва */}
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {/* Якщо query не порожнє, показуємо кнопку "clear" праворуч */}
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
