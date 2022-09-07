import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, FilterByType } from '../../store/filter';
import { selectors } from '../../store/index';

export const TodoFilter: FC = () => {
  const filteringBy = useSelector(selectors.getFilterBy);
  const query = useSelector(selectors.getQuery);
  const dispatch = useDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteringBy}
            onChange={({ target }) => dispatch(
              actions.selectTodosActionCreator(target.value as FilterByType),
            )}
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
          onChange={({ target }) => dispatch(
            actions.setQueryActionCreator(target.value),
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actions.setQueryActionCreator(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
