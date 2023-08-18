import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { SortingStatus } from '../../types/SortingStatus';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const onStatusChange = (status: SortingStatus) => (
    dispatch(filterActions.setStatus(status))
  );

  const onQueryChange = (newQuery: string) => (
    dispatch(filterActions.setQuery(newQuery))
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              onStatusChange(event.target.value as SortingStatus);
            }}
          >
            <option value={SortingStatus.All}>All</option>
            <option value={SortingStatus.Active}>Active</option>
            <option value={SortingStatus.Completed}>Completed</option>
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
