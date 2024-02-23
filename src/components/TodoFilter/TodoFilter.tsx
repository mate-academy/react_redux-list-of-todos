import React, { ChangeEvent } from 'react';
import { Status } from '../../types/Status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleStatusChange = (value: string) => {
    dispatch(filterActions.SetStatus(value as Status));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.SetQuery(value));
  };

  const handleClearSearchClick = () => {
    dispatch(filterActions.SetQuery(''));
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
            onChange={event => handleStatusChange(event.target.value)}
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
          value={filter.query}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
