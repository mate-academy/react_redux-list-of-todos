import React from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setFilter({ status, query: event.target.value }));
  };

  const queryResetHandler = () => {
    dispatch(actions.setFilter({ status, query: '' }));
  };

  const statusChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      actions.setFilter({ query, status: event.target.value as Status }),
    );
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={statusChangeHandler}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={queryChangeHandler}
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
              onClick={queryResetHandler}
            />
          </span>
        )}
      </p>
    </form>
  );
});
