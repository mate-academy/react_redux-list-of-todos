import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  filterEmprtyQuery,
  filterQueryTodos,
  filterStatusTodos,
} from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filterStatus = useAppSelector(state => state.filterTodos.select);
  const filterQuery = useAppSelector(state => state.filterTodos.query);
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={event =>
              dispatch(filterStatusTodos(event.target.value as Status))
            }
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
          value={filterQuery}
          onChange={event => dispatch(filterQueryTodos(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterEmprtyQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
