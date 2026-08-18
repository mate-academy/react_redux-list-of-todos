// TodoFilter.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import type { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  // Дістаємо поточні значення із глобального стору Redux
  const { query, status } = useAppSelector(state => state.filter);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.trimStart();

    dispatch(setQuery(result));
  };

  // Обробник зміни статусу у селекті (All / Active / Completed)
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;

    dispatch(setStatus(newStatus));
  };

  // Обробник очищення інпуту при натисканні на хрестик
  const handleClearQuery = () => {
    dispatch(setQuery(''));
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
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleQuery}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {/* Кнопка очищення з'являється тільки тоді, коли в інпуті є текст */}
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
