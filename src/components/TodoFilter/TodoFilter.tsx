import React, { ChangeEvent } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(store => store.filter);

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
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              const selectedStatus = event.target.value as Status;

              dispatch(filterActions.setStatus(selectedStatus));
            }}
          >
            <option value={Status.All}>{Status.All}</option>
            <option value={Status.Active}>{Status.Active}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
            dispatch(filterActions.setQuery(event.target.value));
          }}
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
              onClick={() => {
                dispatch(filterActions.setQuery(''));
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
