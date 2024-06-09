import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as actionsFilter } from '../../features/filter';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const setStatus = (newStatus: Status) => {
    dispatch(actionsFilter.setStatus(newStatus));
  };

  const setQuery = (newQuery: string) => {
    dispatch(actionsFilter.setQuery(newQuery));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value as Status;

    setStatus(selectedFilter);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setQuery(text);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onChangeSelect}
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
          onChange={onChangeField}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
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
