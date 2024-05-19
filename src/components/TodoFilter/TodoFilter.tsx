import { actions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React from 'react';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const onSelectChange = (status: string) =>
    dispatch(actions.setFilter({ ...filter, status }));

  const onQueryChange = (query: string) =>
    dispatch(actions.setFilter({ ...filter, query }));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              onSelectChange(event.target.value);
            }}
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onQueryChange(event.target.value);
          }}
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
          />
        </span>
      </p>
    </form>
  );
};
