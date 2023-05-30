import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

interface Props {
  filter: { query: string, status: string }
}

export const TodoFilter: React.FC<Props> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const changeStatus = ((status: Status) => (
    dispatch(filterActions.changeStatus(status)))
  );
  const changeQuery = ((query: string) => (
    dispatch(filterActions.changeQuery(query)))
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={(e) => changeStatus(e.target.value as Status)}
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
          value={filter.query}
          className="input"
          placeholder="Search..."
          onChange={(e) => changeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!filter.query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearSearchButton"
              onClick={() => changeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
