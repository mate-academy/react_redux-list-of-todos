import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/store';
import {
  actions as filterActions,
  filterSelector,
} from './../../features/filter';

export const TodoFilter = () => {
  const filter = useAppSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              dispatch(filterActions.setStatus(event.target.value))
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event =>
            dispatch(filterActions.setQuery(event.target.value))
          }
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
              onClick={() => dispatch(filterActions.setQuery(''))}
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
