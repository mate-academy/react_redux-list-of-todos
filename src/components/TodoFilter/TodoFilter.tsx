import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.query.query);

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      default:
        return;
    }
  };

  const handleClearQuery = () => {
    dispatch(actions.clearQuery());
  };

  const options = ['all', 'active', 'completed'];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleStatus(event)}
          >
            {options.map(option => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
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
          onChange={event => {
            handleQuery(event);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={handleClearQuery}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
