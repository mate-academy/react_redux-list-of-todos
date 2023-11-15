import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(status => status.filter);
  const { query, status } = filter;
  const dispatch = useAppDispatch();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterActions.setFilterQuery(event.target.value));
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterActions.setFilterStatus(event.target.value));
  }

  function handleReset() {
    dispatch(filterActions.resetQuery());
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              aria-label="button"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
