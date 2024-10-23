import { ChangeEvent, FC, FormEvent } from 'react';

import { Status } from '../../types/Status';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearQuery,
  setFilter,
  setQuery,
  selectFilter,
} from '../../features/filter';

export const TodoFilter: FC = () => {
  const { query, status } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const handleSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as Status));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClearInput = () => {
    dispatch(clearQuery());
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleFormSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => handleSelectStatus(event)}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
