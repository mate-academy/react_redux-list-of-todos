import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { Status as StatusType } from '../../types/StatusEnum';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const setQuery = (query: string) => dispatch(filterActions.setQuery(query));
  const setStatus = (status: Status) =>
    dispatch(filterActions.setStatus(status));

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  const handleCLear = () => {
    setQuery('');
  };

  const statuses = [StatusType.All, StatusType.Active, StatusType.Completed];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={filter.status}
          >
            {statuses.map(statusToSet => (
              <option key={statusToSet} value={statusToSet}>
                {statusToSet}
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
          value={filter.query}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCLear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
