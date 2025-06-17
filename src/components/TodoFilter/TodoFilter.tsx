import React from 'react';
import { Status } from '../../types/Status';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { changeQuery, changeStatus, resetQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => {
    return state.filter.status as Status;
  });
  const dispatch = useDispatch();

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => dispatch(changeStatus(e.target.value as Status))}
          >
            {['all', 'active', 'completed'].map(el => (
              <option key={el} value={el}>
                {el[0].toUpperCase() + el.substring(1)}
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
          value={query}
          onChange={event => dispatch(changeQuery(event.target.value))}
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
              onClick={() => dispatch(resetQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
