import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSelectStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(filterActions.setStatus(event.target.value as Status));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    setQuery(text);
    dispatch(filterActions.setQuery(text));
  };

  const handleResetQuery = () => {
    setQuery('');
    dispatch(filterActions.setQuery(''));
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
            onChange={handleSelectStatus}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
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

        {
          !!query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleResetQuery}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
