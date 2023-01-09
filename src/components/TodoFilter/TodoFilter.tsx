import { ChangeEvent } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.filter);
  const query = useAppSelector(state => state.filter.query);

  const handleFilterChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    dispatch(filterActions.setStatus(value as Status));
  };

  const handleQueryChange = (
    event?: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event) {
      return dispatch(filterActions.setQuery(''));
    }

    const { value } = event.target;

    return dispatch(filterActions.setQuery(value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleFilterChange(event)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p
        className="
          control
          is-expanded
          has-icons-left
          has-icons-right"
      >
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={(event) => handleQueryChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0
          && (
            <span
              className="icon is-right"
              style={{ pointerEvents: 'all' }}
            >
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="delete"
                onClick={() => handleQueryChange()}
              />
            </span>
          )}
      </p>
    </form>
  );
};
