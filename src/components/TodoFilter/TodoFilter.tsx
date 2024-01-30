import { ChangeEvent, FC } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(e.target.value as Status));
  };

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(e.target.value));
  };

  const handleResetQuery = () => {
    dispatch(filterActions.resetQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={e => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={handleChangeStatus}
            data-cy="statusSelect"
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            >
              {}
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
