import React from 'react';
import { changeQuery, changeStatus } from '../../features/filter';
import { Status } from '../../types/Status';
import { useDispatch } from 'react-redux';
import { selector } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = selector(state => state.filter).query;

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeQuery(event.target.value));
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeStatus(event.target.value as Status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeStatus}>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(changeQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
