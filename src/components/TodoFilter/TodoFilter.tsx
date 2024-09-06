import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuary, changeStatus } from '../../features/filter';
import { Status } from '../../types/Status';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const { status, query } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const handleSelectFilter = (statusPayload: Status) => {
    dispatch(changeStatus(statusPayload));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectFilter(event.target.value as Status);
  };

  const handleQuery = (queryPayload: string) => {
    dispatch(changeQuary(queryPayload));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={handleChange}>
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
          onChange={event => handleQuery(event.target.value)}
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
