import React, { ChangeEvent } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFilter, setQuery, setStatus } from '../../features';

const statusOptions: Status[] = ['all', 'active', 'completed'];

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(selectFilter);

  const dispatch = useAppDispatch();

  const setFilterOption = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
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
            onChange={setFilterOption}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
          onChange={event => dispatch(setQuery(event.target.value.trimStart()))}
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
