import { useAppDispatch, useAppSelector } from '../../app/store';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const selectValue = useAppSelector(state => state.filter.status);
  //const filter = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(filterSlice.actions.setQuery(value));
  };

  const handleQueryClear = () => {
    dispatch(filterSlice.actions.clearQuery());
  };

  // Status aka. filter
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    dispatch(filterSlice.actions.setStatus(status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={event => handleStatusChange(event)}
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
          value={query}
          className="input"
          placeholder="Search..."
          onChange={event => handleQueryChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
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
