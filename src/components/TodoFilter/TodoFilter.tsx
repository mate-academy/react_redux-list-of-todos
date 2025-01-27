import { useDispatch } from 'react-redux';
import { actions as filterActions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  function handleOptionValue(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterActions.status(event.target.value));
  }

  function handleInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterActions.query(event.target.value));
  }

  function clear() {
    dispatch(filterActions.query(''));
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOptionValue}>
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
          value={filter.query}
          onChange={handleInputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
