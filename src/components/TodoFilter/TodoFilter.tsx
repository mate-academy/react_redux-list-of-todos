import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

import { StatusTodos } from '../../types/StatusTodos';
import { ShowTodos } from '../../types/ShowTodos';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const { setQuery, setStatus } = filterActions;

  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case StatusTodos.Active:
        dispatch(setStatus(ShowTodos.Active));
        break;

      case StatusTodos.Completed:
        dispatch(setStatus(ShowTodos.Completed));
        break;

      default:
        dispatch(setStatus(ShowTodos.All));
        break;
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const clearQuery = () => dispatch(setQuery(''));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleFilterStatus}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleQueryChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query && (
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
