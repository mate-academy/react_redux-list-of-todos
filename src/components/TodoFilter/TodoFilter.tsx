import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions } from '../../features/filter';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => (
    dispatch(actions.setStatus(event.target.value as Status))
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    dispatch(actions.setQuery(event.target.value))
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelect}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="label"
              onClick={() => dispatch(actions.clearQuery())}
            />
          )}
        </span>
      </p>
    </form>
  );
};
