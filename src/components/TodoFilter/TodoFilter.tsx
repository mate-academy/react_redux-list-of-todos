import React from 'react';
import { RootState } from '../../app/store';
import { setFilter, setQuery } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../hooks';

type Props = {};

export const TodoFilter: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state: RootState) => state.filter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e =>
              dispatch(
                setFilter(e.target.value as 'all' | 'active' | 'completed'),
              )
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
          onClick={() => dispatch(setQuery(''))}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
