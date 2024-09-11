import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import {
  actions as filterActions,
  filterSelector,
} from './../../features/filter';

export const TodoFilter = () => {
  const filter = useAppSelector(filterSelector);
  const dispatch = useDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  const handleClearButton = () => dispatch(filterActions.setQuery(''));
  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <form className="field has-addons" onSubmit={handleFormSubmit}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleQueryChange}
          value={filter.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClearButton}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
