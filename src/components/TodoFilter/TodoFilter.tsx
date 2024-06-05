import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';
import { ByFilter } from '../../types/ByFilter';

export const TodoFilter: FC = () => {
  const dispatch = useDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e =>
              dispatch(actions.setStatus(e.target.value as Status))
            }
          >
            <option value={ByFilter.ALL}>All</option>
            <option value={ByFilter.ACTIVE}>Active</option>
            <option value={ByFilter.COMPLETED}>Completed</option>
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
          onChange={event => dispatch(actions.setQuery(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
