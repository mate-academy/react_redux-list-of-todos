import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { validateStatus } from '../../helpers';
import { Filters } from '../../types/Filters';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  const setFilters = (filters: Filters) => (
    dispatch(filterActions.setFilters(filters))
  );

  const clearQuery = () => dispatch(filterActions.clearQuery());

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ status, query: event.target.value });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ status: validateStatus(event.target.value), query });
  };

  const isQueryEmpty = query.length === 0;

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
            value={status}
          >
            {Object.entries(Status).map(([key, value]) => (
              <option
                value={value}
                key={key}
              >
                {key}
              </option>
            ))}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {isQueryEmpty || (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => clearQuery()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
