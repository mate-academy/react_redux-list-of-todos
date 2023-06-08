import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const handleQueryChange = (value: string) => dispatch(
    filterActions.setQuery(value),
  );
  const handleStatusChange = (value: Status) => dispatch(
    filterActions.setStatus(value),
  );

  const filter = useAppSelector(state => state.filter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={(e) => handleStatusChange(e.target.value as Status)}
          >
            <option value={Status.all}>{Status.all}</option>
            <option value={Status.active}>{Status.active}</option>
            <option value={Status.completed}>{Status.completed}</option>
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
          onChange={(e) => handleQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryChange('')}
            >
              x
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
