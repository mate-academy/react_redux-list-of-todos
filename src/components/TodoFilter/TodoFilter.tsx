import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Filter, actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';
import { actions as actionsTodos } from '../../features/todos';

type Props = {
  allTodos: Todo[],
};

export const TodoFilter: React.FC<Props> = ({ allTodos }) => {
  const { query, status }: Filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handlerChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionsFilter.setStatus(e.target.value as Status));
  };

  const handlerChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(e.target.value));
  };

  const handlerRemoveQuery = () => {
    dispatch(actionsFilter.removeQuery());
  };

  const getFiltered = useMemo(() => allTodos.filter(todo => {
    const correctQuery = query.toLowerCase();

    return query
      ? todo.title.toLowerCase().includes(correctQuery)
      : true;
  }).filter(todo => {
    switch (status) {
      case Status.All:
        return true;

      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  }), [status, query]);

  useEffect(() => {
    dispatch(actionsTodos.setTodos(getFiltered));
  }, [query, status]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerChangeStatus}
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
          onChange={handlerChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="button delete query"
              className="delete"
              onClick={handlerRemoveQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
