import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as actionFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionFilter.addStatus(event.target.value as Status));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionFilter.addQuery(event.target.value as string));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleChangeSelect}
          >
            <option value="all">All </option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actionFilter.addQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
