import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.setStatus(filterStatus));
    dispatch(actions.setQuery(filterQuery));
  }, [filterQuery, filterStatus]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
          value={filterQuery}
          onChange={(e) => (
            setFilterQuery(e.target.value)
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterQuery && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilterQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
