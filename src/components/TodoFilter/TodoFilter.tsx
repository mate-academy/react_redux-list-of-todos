import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterAction } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useAppSelector((state) => state.filter);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterAction.addStatus(e.target.value));
  };

  const handleQuerySet = (query = '') => {
    dispatch(filterAction.addQuery(query));
  };

  return (
    <form
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filter.status}
            onChange={handleStatusChange}
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
          onChange={(e) => handleQuerySet(e.target.value)}
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
            onClick={() => handleQuerySet()}
          />
        </span>
        )}
      </p>
    </form>
  );
};
