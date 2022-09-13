import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/filter';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { setQuery, setFilter } = actions;

  const selectFilterOption = (state: RootState) => state.filter.status;
  const selectQuery = (state: RootState) => state.filter.query;

  const filterOption = useSelector(selectFilterOption);
  const query = useSelector(selectQuery);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => (dispatch(setFilter(event.target.value)))}
            value={filterOption}
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
          onChange={(event) => (dispatch(setQuery(event.target.value)))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch(setQuery(''));
                dispatch(setFilter('All'));
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
