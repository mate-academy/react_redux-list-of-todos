import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  FilterPayloadType,
  actions as filterAction,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filterData = useAppSelector(store => store.filter);
  const dispatch = useAppDispatch();

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterData.status}
            onChange={event =>
              dispatch(
                filterAction.setFilter(event.target.value as FilterPayloadType),
              )
            }
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
          value={filterData.query}
          onChange={event =>
            dispatch(filterAction.setQuery(event.target.value))
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterData.query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterAction.clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
