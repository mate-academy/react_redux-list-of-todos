import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={status}
            onChange={event =>
              dispatch(filterActions.onFilterStatusChange(event.target.value))
            }
          >
            {Object.entries(Status).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event =>
            dispatch(filterActions.onQueryChange(event.target.value))
          }
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
            <button
              aria-label="Clear query"
              onClick={() => dispatch(filterActions.onQueryChange(''))}
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
