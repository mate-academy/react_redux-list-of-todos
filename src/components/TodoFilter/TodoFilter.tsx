import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useAppSelector(state => state.filter);

  function onChangeStatus(value: string) {
    dispatch(filterSlice.actions.setStatus(value));
  }

  function onChangeQuery(value: string) {
    dispatch(filterSlice.actions.setQuery(value));
  }

  function onClearQuery() {
    dispatch(filterSlice.actions.clearQuery());
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onChangeStatus(e.target.value)}
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
          value={selector.query}
          onChange={e => onChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {selector.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
