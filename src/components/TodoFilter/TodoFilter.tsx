import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterAction } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleStatus = (newStatus: Status) => {
    dispatch(filterAction.setStatus(newStatus));
  };

  const handleQuery = (newQuery: string) => {
    dispatch(filterAction.setQuery(newQuery));
  };

  const statusValues = Object.values(Status);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            className="select-type"
            data-cy="statusSelect"
            value={status}
            onChange={(event) => handleStatus(event.target.value as Status)}
          >
            {statusValues.map((filterType) => (
              <option
                key={filterType}
                value={filterType}
              >
                {filterType}
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
          onChange={(event) => handleQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="Mute volume"
              type="button"
              className="delete"
              onClick={() => handleQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
