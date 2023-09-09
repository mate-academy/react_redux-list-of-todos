import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector((state) => state.filter.query);
  const dispatch = useDispatch();

  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.currentTarget.value as Status;

    dispatch(filterActions.changeStatus(status));
  };

  const onQuerySetting = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(e.currentTarget.value.toLowerCase()));
  };

  const onClearInput = () => {
    dispatch(filterActions.clearQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onStatusChange}>
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
          onChange={onQuerySetting}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clear"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
