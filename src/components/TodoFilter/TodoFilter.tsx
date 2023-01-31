import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status, Statuses } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => (
    dispatch(filterActions.setStatusAction(e.target.value as Status))
  );

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => (
    dispatch(filterActions.setQueryAction(e.target.value.trimStart()))
  );

  const handleClearQuery = () => dispatch(filterActions.setQueryAction(''));

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
            onChange={handleChangeStatus}
          >
            {Statuses.map(currStatus => (
              <option key={currStatus} value={currStatus}>
                {currStatus}
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
          value={query}
          placeholder="Search..."
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearQuery}
          />
        </span>
      </p>
    </form>
  );
};
