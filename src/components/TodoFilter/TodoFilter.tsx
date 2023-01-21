import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleQueryChange = (newQuery: string) => {
    dispatch({ payload: newQuery, type: 'query/SET' });
  };

  const handleStatusChange = (newStatus: Status) => {
    dispatch({ payload: newStatus, type: 'status/SET' });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter?.status || 'all'}
            onChange={(e => handleStatusChange(e.target.value as Status))}
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
          value={filter?.query || ''}
          onChange={e => handleQueryChange(e.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {filter?.query?.length
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => handleQueryChange('')}
                aria-label="Clear"
              />
            )}
        </span>
      </p>
    </form>
  );
};
