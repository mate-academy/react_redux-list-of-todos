import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const filter = useSelector<RootState, Status>(state => state.filter.status);
  const query = useSelector<RootState, string>(state => state.filter.query);

  const dispatch = useDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.currentTarget.value as Status;

    dispatch(filterActions.filter(filterType));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryData = event.currentTarget.value;

    dispatch(filterActions.setQuery(queryData));
  };

  const clear = () => dispatch(filterActions.setQuery());

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
            value={filter}
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
          onChange={handleInput}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clear}
            />
          </span>
        )}

      </p>
    </form>
  );
};
