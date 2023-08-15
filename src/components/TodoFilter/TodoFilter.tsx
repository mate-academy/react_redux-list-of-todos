import React, { ChangeEvent, useState } from 'react';
import { actions as filterActions } from '../../features/filter';
import { actions as todosActions } from '../../features/todos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

function findTodos(todos: Todo[], prompt: string) {
  const searchBy = prompt.trim().toLowerCase();

  if (searchBy) {
    return todos.filter((todo) => todo.title.toLowerCase().includes(searchBy));
  }

  return todos;
}

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const initialStore = useAppSelector(state => state.todos.initialArray);
  const { query, status } = useAppSelector(state => state.filter);

  const [isSearched, setIsSearched] = useState(false);

  const handleTodosChange = (filter: string, newQuery: string) => {
    let initialCopy = [...initialStore];

    switch (filter) {
      case 'active': {
        initialCopy = initialCopy.filter((todo) => !todo.completed);
        break;
      }

      case 'completed': {
        initialCopy = initialCopy.filter((todo) => todo.completed);
        break;
      }

      case 'all':
      default:
        break;
    }

    initialCopy = findTodos(initialCopy, newQuery);
    dispatch(todosActions.setFiltered(initialCopy));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;

    dispatch(filterActions.set(query, newFilter));
    handleTodosChange(newFilter, query);
  };

  const setNewPrompt = (value: string) => {
    const prompt = value;

    dispatch(filterActions.setQuery(prompt));
    handleTodosChange(status, prompt);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value;

    if (prompt.length === 0) {
      setIsSearched(false);
    }

    setNewPrompt(prompt);
    setIsSearched(true);
  };

  const handleQueryReset = () => {
    const prompt = '';

    setNewPrompt(prompt);
    setIsSearched(false);
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
            onChange={(e) => handleFilterChange(e)}
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
          onChange={(e) => handleQueryChange(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {isSearched && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryReset()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
