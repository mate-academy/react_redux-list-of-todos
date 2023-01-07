import React from 'react';
import { useDispatch } from 'react-redux';
import { actions, Statuses } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);

  const dispatch = useDispatch();

  const setQuery = (curQuery: string) => dispatch(actions.setQuery(curQuery));

  const setStatus = (curStatus: string) => dispatch(actions
    .setStatus(curStatus));

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value={Statuses.All}>All</option>
            <option value={Statuses.Active}>Active</option>
            <option value={Statuses.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
