/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import {actions, statusType} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filterDispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);

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
            onChange={event => {
              filterDispatch(actions.setStatus(event.target.value as statusType))
            }}
          >
            <option value={statusType.ALL}>
              All
            </option>
            <option value={statusType.ACTIVE}>
              Active
            </option>
            <option value={statusType.COMPLETED}>
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
          value={filter.query}
          onChange={e => filterDispatch(actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {
            filter.query.length > 0 && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => filterDispatch(actions.clearQuery())}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
