import { useDispatch } from 'react-redux';
import { actions as FilterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const onChangeFilter = (filter: Status) => {
    dispatch(FilterActions.changeFilter(filter));
  };

  const onChangeQuery = (value: string) => {
    dispatch(FilterActions.changeQuery(value));
  };

  const onClearQuery = () => {
    dispatch(FilterActions.clearQuery());
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
            onChange={e => onChangeFilter(e.target.value as Status)}
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
          onChange={e => onChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear input"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
