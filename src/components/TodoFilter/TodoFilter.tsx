import React from 'react';
import { filterSlice } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const { actions } = filterSlice;

export const TodoFilter: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'all':
        dispatch(actions.setStatus('all'));
        break;
      case 'active':
        dispatch(actions.setStatus('active'));
        break;
      case 'completed':
        dispatch(actions.setStatus('completed'));
        break;
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
