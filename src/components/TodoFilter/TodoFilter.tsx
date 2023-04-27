import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setFilter(event.currentTarget.value as Status));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.currentTarget.value));
  };

  const deleteQuery = () => {
    dispatch(actions.setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={onSelectChange}
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
          value={query}
          onChange={onInputChange}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={deleteQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
