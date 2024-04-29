import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const query = useAppSelector(state => state.filter.query);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.queryChange(e.target.value));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.statusChange(e.target.value as Status));
  };

  const status = useAppSelector(state => state.filter.status);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={handleStatusChange}
            data-cy="statusSelect"
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
          onChange={handleQueryChange}
          placeholder="Search..."
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.queryChange(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
