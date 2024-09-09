import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { TodoState } from '../../types/TodoState';
import './TodoFilter.scss';
import { actions } from '../../features/filter';

export const TodoFilter = () => {
  const inputQuery = useAppSelector(state => state.filter.query);
  const selectQuery = useAppSelector(state => state.filter.status);
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const clearQueryInput = () => {
    dispatch(actions.setQuery(''));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setStatus(event.target.value as TodoState));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectQuery}
            onChange={handleSelectChange}
          >
            <option value={TodoState.ALL}>All</option>
            <option value={TodoState.ACTIVE}>Active</option>
            <option value={TodoState.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputQuery && (
          <span className="icon is-right clearButton">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQueryInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
