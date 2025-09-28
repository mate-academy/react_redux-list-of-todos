import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setQuery(event.target.value));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.setStatus(event.target.value as Status));
  };

  const handleQueryClear = () => {
    dispatch(filterSlice.actions.resetQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleStatusChange}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="Clear search"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
