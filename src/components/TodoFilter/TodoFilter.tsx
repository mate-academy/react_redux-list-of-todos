import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const setStatus = (newStatus: Status) => {
    dispatch(filterActions.setStatus(newStatus));
  };

  const setQuery = (newQuery: string) => {
    dispatch(filterActions.setQuery(newQuery));
  };

  const clearQuery = () => dispatch(filterActions.clearQuery());

  const query = useAppSelector(state => state.filter.query);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => setStatus(event.target.value as Status)}
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
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              onClick={clearQuery}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
