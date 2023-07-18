import React from 'react';
import { useDispatch } from 'react-redux';
import { State, actions as filterActions } from '../../features/filter';
import { actions as todosActions } from '../../features/todos';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const queryState = useAppSelector(state => state.filter.query);
  const todos: Todo[] = useAppSelector(state => state.todos);
  const filter: State = useAppSelector(state => state.filter);

  function filteredTodos(dataFilter: State) {
    switch (dataFilter.status) {
      case 'filter/ACTIVE':
        dispatch(todosActions.setTodos(
          todos.filter(t => t.completed === false),
        ));
        break;

      case 'filter/COMPLETED':
        dispatch(todosActions.setTodos(
          todos.filter(t => t.completed === true),
        ));
        break;

      case 'filter/ALL':
      default:
        break;
    }

    if (dataFilter.query !== '') {
      dispatch(todosActions.setTodos(
        todos.filter(t => t.title.includes(dataFilter.query)),
      ));
    }
  }

  const query = (value: string) => {
    dispatch(filterActions.query(value));
    filteredTodos(filter);
  };

  const all = () => {
    dispatch(filterActions.status.all());
    filteredTodos(filter);
  };

  const active = () => {
    dispatch(filterActions.status.active());
    filteredTodos(filter);
  };

  const completed = () => {
    dispatch(filterActions.status.completed());
    filteredTodos(filter);
  };

  function handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    query(event.target.value);
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect">
            <option onClick={all} value="all">All</option>
            <option onClick={active} value="active">Active</option>
            <option onClick={completed} value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={queryState}
          onChange={handleQuery}
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
