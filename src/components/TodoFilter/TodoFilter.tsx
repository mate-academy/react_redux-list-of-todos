import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);

  const dispatch = useDispatch();

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'completed':
        return dispatch(actions.status(event.target.value));
      case 'active':
        return dispatch(actions.status(event.target.value));

      case 'all':
        return dispatch(actions.status(event.target.value));

      default:
        return event.target.value;
    }
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.query(event.target.value));
  };

  const clearSearchBar = () => {
    dispatch(actions.query(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
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
          onChange={handleQuery}
          value={query}
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
              onClick={clearSearchBar}
              aria-label="clear search bar"
            />
          </span>
        )}
      </p>
    </form>
  );
};
