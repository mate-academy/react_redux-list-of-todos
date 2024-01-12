import { Status } from '../../types/Status';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            // eslint-disable-next-line max-len
            onChange={(e) => dispatch(actions.setFilter(e.target.value as Status))}
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
          onChange={(e) => dispatch(actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => dispatch(actions.clearQuery())}
          />
        </span>
      </p>
    </form>
  );
};
