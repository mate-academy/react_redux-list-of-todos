import { FC, memo } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filterActions } from '../../store/filter';
import { FilterType } from '../../types/FilterType';
import { selectors } from '../../store';

export const TodoFilter: FC = memo(() => {
  const dispatch = useDispatch();
  const { filterType, query } = useSelector(selectors.getFilter);

  const setAppliedQuery = (str: string) => {
    dispatch(filterActions.setAppliedQuery(str));
  };

  const applyQuery = debounce(setAppliedQuery, 500);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => {
              dispatch(
                filterActions.setFilterType(event.target.value as FilterType),
              );
            }}
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
          onChange={(event) => {
            const { value } = event.target;

            dispatch(filterActions.setQuery(value));
            applyQuery(value);
          }}
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
              onClick={() => {
                dispatch(filterActions.setQuery(''));
                applyQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
});
