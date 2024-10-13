import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  changeFilterQuery,
  changeFilterStatus,
  clearFilterQuery,
} from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const onChangeFilterState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeFilterStatus(e.currentTarget.value as Status));
  };

  const onChangeFilterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterQuery(e.target.value));
  };

  const onClickClearQuery = () => {
    dispatch(clearFilterQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onChangeFilterState}>
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
          onChange={onChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={onClickClearQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
