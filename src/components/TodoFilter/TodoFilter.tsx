import React from 'react';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const OPTIONS: Status[] = ['all', 'active', 'completed'];

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state: RootState) => state.filter);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(setStatus(e.target.value as Status))}
          >
            {OPTIONS.map(opt => {
              const name = opt.slice(0, 1).toUpperCase() + opt.slice(1);

              return (
                <option key={opt} value={opt}>
                  {name}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={e => dispatch(setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
