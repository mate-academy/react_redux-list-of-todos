import React, { FC } from 'react';

import { StatusSelect } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { actions as actionsFilter } from '../../redux/filter/filter';
import { useAppSelector } from '../../hooks/hooks';

export const TodoFilter: FC = () => {
  const dispatch = useDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionsFilter.setStatus(event.target.value as StatusSelect));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(event.target.value));
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect} value={status}>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actionsFilter.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
