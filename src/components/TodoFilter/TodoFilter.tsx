import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import './TodoFilter.scss';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const setStatus = (status: string) => dispatch(actions.setStatus(status));
  const setQuery = (query: string) => dispatch(actions.setQuery(query));
  const query = useAppSelector(state => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setStatus(e.target.value)}
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
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right isClickable">
            <button
              data-cy="clearSearchButton"
              aria-label="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
