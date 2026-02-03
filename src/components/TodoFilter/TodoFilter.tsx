import React from 'react';
import { setQuery, setStatus } from '../../features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filterTodo = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterTodo.status}
            onChange={e => dispatch(setStatus(e.target.value as Status))}
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
          value={filterTodo.query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => dispatch(setQuery(e.target.value))}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterTodo.query.length === 0 ? null : (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(setQuery(''));
                dispatch(setStatus('all'));
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
