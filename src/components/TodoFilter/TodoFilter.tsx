import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleSelectChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'all':
        dispatch(actions.findAll());
        break;

      case 'active':
        dispatch(actions.findActive());
        break;

      case 'completed':
        dispatch(actions.findCompleted());
        break;

      default:
        break;
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.findByQuery(event.target.value));
  };

  const handleClearInput = (() => {
    dispatch(actions.findByQuery(''));
  });

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={status}
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
          onChange={(e) => handleInputChange(e)}
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
              aria-label="clearSearchButton"
              onClick={handleClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
