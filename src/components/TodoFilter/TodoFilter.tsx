import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const byStatus = (statusField: Status) => {
    dispatch(filterSlice.actions.setStatus(statusField));
  };

  const byQuery = (queryField: string) => {
    dispatch(filterSlice.actions.setQuery(queryField));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => byStatus(event.target.value as Status)}
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
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => byQuery(event.target.value)}
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
              onClick={() => byQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
