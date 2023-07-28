import { FC, ChangeEvent } from 'react';
import { Status } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as FilterActions } from '../../features/filter';

export const TodoFilter: FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const changeFilterStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(FilterActions.changeStatus(event.target.value as Status));
  };

  const onQueryChange = (query: string) => {
    dispatch(FilterActions.changeQuery(query));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={(event) => changeFilterStatus(event)}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter.query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
