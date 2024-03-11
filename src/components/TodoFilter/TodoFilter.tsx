import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status, query } = useAppSelector(state => state.filter);

  const onStatus = (newStatus: Status) => {
    dispatch(actions.setStatus(newStatus));
  };

  const onQuery = (newQuery: string) => {
    dispatch(actions.setQuery(newQuery));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => onStatus(event.target.value as Status)}
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
          value={query}
          onChange={event => onQuery(event?.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            >
              Clear
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
