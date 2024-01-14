import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { RootState } from '../../app/store';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filterState = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const statusOptions = [
    { value: Status.all, title: 'All' },
    { value: Status.active, title: 'Active' },
    { value: Status.completed, title: 'Completed' },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => dispatch(actions
              .setStatus(e.target.value as Status))}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
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
          value={filterState.query}
          onChange={(e) => dispatch(actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterState.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
