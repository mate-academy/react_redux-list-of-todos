import React from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

enum FilterStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC = () => {
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useDispatch();
  const changeFilterStatus = (newStatus: FilterStatus) => {
    dispatch(filterSlice.actions.changeStatus(newStatus));
  };

  const changeFilterQuery = (newQuery: string) => {
    dispatch(filterSlice.actions.changeQuery(newQuery));
  };

  const clearQuery = () => {
    dispatch(filterSlice.actions.changeQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              changeFilterStatus(event.target.value as FilterStatus)
            }
          >
            <option value={FilterStatus.all}>All</option>
            <option value={FilterStatus.active}>Active</option>
            <option value={FilterStatus.completed}>Completed</option>
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeFilterQuery(event.target.value)
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
