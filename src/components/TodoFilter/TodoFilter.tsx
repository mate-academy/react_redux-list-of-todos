import { SelectStatusTodos } from '../../types/SelectStatusTodos';
import { clearQuery, setQuery, setStatus } from '../../features/filter';
import { useTodoFilter } from '../../hooks/useTodoFilter';

export const TodoFilter = () => {
  const { dispatch, query } = useTodoFilter();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              dispatch(setStatus(event.target.value as SelectStatusTodos))
            }
          >
            <option value={SelectStatusTodos.All}>All</option>
            <option value={SelectStatusTodos.Active}>Active</option>
            <option value={SelectStatusTodos.Completed}>Completed</option>
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
          onChange={event => dispatch(setQuery(event.target.value.trimStart()))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(clearQuery())}
            />
          )}
        </span>
      </p>
    </form>
  );
};
