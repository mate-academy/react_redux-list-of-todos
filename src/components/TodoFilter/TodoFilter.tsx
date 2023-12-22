import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { Status } from '../../types/Status';
import { actions as actionsFilter } from '../../features/filter';
import { actions as actionsTodos } from '../../features/todos';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';

export const TodoFilter = () => {
  const todos
    = useAppSelector(state => state.todos);
  const filter
    = useAppSelector(state => state.filter);

  const dispatch = useDispatch();

  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        dispatch(actionsTodos.updateTodos(todosFromServer));
        setInitialTodos(todosFromServer);
      });
  }, []);

  const getVisibleTodos = (newFilter: Status, query: string) => {
    const todosWithQuery = initialTodos.filter(todo => (
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ));

    switch (newFilter) {
      case 'active':
        return todosWithQuery.filter(todo => !todo.completed);

      case 'completed':
        return todosWithQuery.filter(todo => todo.completed);

      case 'all':
        return todosWithQuery;

      default:
        return todos;
    }
  };

  const isDeleteBtnVisible = filter.query.length > 0;

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as Status;

    dispatch(actionsFilter.setStatus(newFilter));
    dispatch(actionsTodos.updateTodos(getVisibleTodos(newFilter, '')));
  };

  const handleInpitQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(event.target.value));
    dispatch(actionsTodos.updateTodos(getVisibleTodos(
      filter.status,
      event.target.value,
    )));
  };

  const handleDeleteBtn = () => {
    dispatch(actionsFilter.clearQuery());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleSelectFilter}
            data-cy="statusSelect"
          >
            <option value="all">ALL</option>
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
          value={filter.query}
          onChange={handleInpitQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isDeleteBtnVisible && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteBtn}
            />
          </span>
        )}
      </p>
    </form>
  );
};
