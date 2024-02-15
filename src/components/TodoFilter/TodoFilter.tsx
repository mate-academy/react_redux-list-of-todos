/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={(event) => dispatch(actions.setStatus(event.target.value))}
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
          value={filter.query}
          onChange={(event) => dispatch(actions.setQuery(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          )}

        </span>
      </p>
    </form>
  );
};
