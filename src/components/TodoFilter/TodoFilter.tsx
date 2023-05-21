/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useSelector<RootState, string>(state => state.filter.status);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const stateData = useSelector<RootState>(state => state.filter);

  const dispatch = useDispatch();

  const updateStates = (filterValue: string, queryValue: string) => {
    switch (filterValue) {
      case 'all':
        return dispatch(filterActions.filterAll(queryValue));

      case 'active':
        return dispatch(filterActions.filterActive(queryValue));

      case 'completed':
        return dispatch(filterActions.filterCompleted(queryValue));

      default: return stateData;
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterType = event.currentTarget.value;

    updateStates(filterType, query);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryData = event.currentTarget.value;

    updateStates(filter, queryData);
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
