import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as filterAction } from '../../features/filter';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const filterQuery = useAppSelector(state => state.filter.query);

  const changeQuery = (value: string) => {
    dispatch(filterAction.setQuery(value));
  };

  const changeOption = (value: Status) => {
    dispatch(filterAction.setStatus(value));
  };

  const clearQuery = () => {
    dispatch(filterAction.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => changeOption(event.target.value as Status)}
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
          value={filterQuery}
          onChange={event => changeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {filterQuery && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
