import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { filterSlice } from '../../features/filter';
import { getTodos } from '../../api';
import { todosSlice } from '../../features/todos';

export const TodoFilter: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.setStatus(event.target.value));

    getTodos().then(todos => {
      switch (event.target.value) {
        case 'all':
          dispatch(todosSlice.actions.setTodos(todos));
          break;
        case 'active':
          dispatch(
            todosSlice.actions.setTodos(todos.filter(todo => !todo.completed)),
          );
          break;
        case 'completed':
          dispatch(
            todosSlice.actions.setTodos(todos.filter(todo => todo.completed)),
          );
          break;
      }
    });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setQuery(event.target.value));

    getTodos().then(todos => {
      const filteredTodos =
        status === 'all'
          ? todos
          : status === 'active'
            ? todos.filter(todo => !todo.completed)
            : todos.filter(todo => todo.completed);

      dispatch(
        todosSlice.actions.setTodos(
          filteredTodos.filter(todo =>
            todo.title.toLowerCase().includes(event.target.value.toLowerCase()),
          ),
        ),
      );
    });
  };

  const clearSearch = () => {
    dispatch(filterSlice.actions.setQuery(''));
    getTodos().then(todos => {
      dispatch(todosSlice.actions.setTodos(todos));
    });
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
            onChange={event => handleSelectChange(event)}
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
          onChange={event => handleQueryChange(event)}
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
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
