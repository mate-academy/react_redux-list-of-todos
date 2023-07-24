/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Filters } from '../../types/Filters';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filter);
  const { query } = filters;

  const handleChangeFilter = (value: string) => {
    switch (value) {
      case 'all': dispatch(actions.setFilter(Filters.All));
        break;
      case 'completed': dispatch(actions.setFilter(Filters.Completed));
        break;
      case 'active': dispatch(actions.setFilter(Filters.Active));
        break;
      default: throw Error();
    }
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
            onChange={(event) => handleChangeFilter(event.target.value)}
          >
            <option
              value="all"
            >
              All

            </option>
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
          onChange={(event) => dispatch(actions.setQuery(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
