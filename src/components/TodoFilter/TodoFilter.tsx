import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { actions } from '../../features/filter';
import { StatusTp } from '../../features/statusType';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  const handelQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.queryFilter(e.target.value));
  };

  const handelStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.statusFilter(e.target.value as StatusTp));
  };

  const clearSearch = () => {
    dispatch(actions.queryFilter(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handelStatusChange}>
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
          onChange={handelQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
