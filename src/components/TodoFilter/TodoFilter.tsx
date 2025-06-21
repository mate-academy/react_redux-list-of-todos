import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={e => dispatch(setStatus(e.target.value))}
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
          onChange={e => dispatch(setQuery(e.target.value))}
          data-cy="searchInput"
          type="text"
          value={searchQuery}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(setQuery(''));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
