import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/filter';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterData = useAppSelector(s => s.filter);

  function handllerOnchangeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;

    dispatch(actions.changeStatus(status));
  }

  function handllerOnchangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;

    dispatch(actions.changeQuery(query));
  }

  function clearInput() {
    dispatch(actions.clearQuery());
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handllerOnchangeStatus}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filterData.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handllerOnchangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filterData.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
