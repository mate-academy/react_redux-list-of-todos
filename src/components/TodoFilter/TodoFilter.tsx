import { ChangeEvent } from 'react';
import { StatusFilter } from '../../types/StatusFilter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filterQuery = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const changeFilterStatus = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => dispatch(
    filterActions.setTodoFilter(event.target.value as StatusFilter),
  );

  const changeFilterQuery = (
    event: ChangeEvent<HTMLInputElement>,
  ) => dispatch(
    filterActions.setTodoQuery(event.target.value),
  );

  const clearQuery = () => dispatch(
    filterActions.clearTodoQuery(),
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeFilterStatus}
          >
            <option value={StatusFilter.All}>All</option>
            <option value={StatusFilter.ACTIVE}>Active</option>
            <option value={StatusFilter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterQuery.query}
          onChange={changeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
