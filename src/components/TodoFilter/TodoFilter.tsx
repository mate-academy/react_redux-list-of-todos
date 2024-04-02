import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [newQuery, setNewQuery] = useState('');
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      dispatch(actions.setQuery(newQuery));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [dispatch, newQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              dispatch(actions.setStatus(event.target.value as Status))
            }
          >
            <option value={'all'}>All</option>
            <option value={'active'}>Active</option>
            <option value={'completed'}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={newQuery}
          onChange={event => setNewQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setNewQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
