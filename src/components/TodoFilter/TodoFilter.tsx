import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Statuses, isValidStatus } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';
import { actions } from '../../features/todos';
import { Todo } from '../../types/Todo';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector((state) => state.filter);
  const { allTodos } = useAppSelector((state) => state.todos);

  const setStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (isValidStatus(value)) {
      dispatch(filterActions.setStatus(value));
    }
  };

  const setQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch(filterActions.setQuery(value));
  };

  const clearQuery = () => {
    dispatch(filterActions.clearQuery());
  };

  const getfilteredTodos = (): Todo[] => {
    let filteredTodos = [...allTodos];

    if (status === Statuses.completed) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    }

    if (status === Statuses.active) {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    }

    if (query.trim()) {
      filteredTodos = filteredTodos.filter((todo) => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return filteredTodos;
  };

  const setVisibleTodos = (filteredTodos: Todo[]) => {
    dispatch(actions.setVisibleTodos(filteredTodos));
  };

  useEffect(() => {
    const filteredTodos = getfilteredTodos();

    setVisibleTodos(filteredTodos);
  }, [status, query]);

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={setStatus}>
            <option value={Statuses.all}>All</option>
            <option value={Statuses.active}>Active</option>
            <option value={Statuses.completed}>Completed</option>
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
          onChange={setQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
