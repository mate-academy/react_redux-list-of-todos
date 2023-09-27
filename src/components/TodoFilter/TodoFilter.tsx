import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

type Props = {
  query: string;
  status: string;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
}) => {
  const dispatch = useAppDispatch();

  const updateFilter = (value: string) => {
    if (value === 'all') {
      return filterActions.showAllTodos(query);
    }

    if (value === 'active') {
      return filterActions.showActiveTodos(query);
    }

    if (value === 'completed') {
      return filterActions.showCompletedTodos(query);
    }

    if (value === 'delete') {
      return filterActions.deleteQuery(status);
    }

    return filterActions.showAllTodos(query);
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
            value={status}
            onChange={(e) => dispatch(updateFilter(e.target.value))}
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
          onChange={(e) => dispatch(filterActions.changeQuery(e.target.value))}
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
            onClick={() => dispatch(updateFilter('delete'))}
          />
        </span>
      </p>
    </form>
  );
};
