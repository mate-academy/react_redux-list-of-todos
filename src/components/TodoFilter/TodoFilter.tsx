import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const [option, setOption] = useState('All');
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(actions.filterAll(todos));
  }, [todos]);

  useEffect(() => {
    const newTodo = todos.filter(
      todo => todo.title.toLowerCase().includes(query.toLocaleLowerCase()),
    );

    dispatch(actions.filterQuery(newTodo));

    switch (option) {
      case 'completed':
        dispatch(actions.filterCompleted(newTodo));
        break;
      case 'active':
        dispatch(actions.filterActive(newTodo));
        break;
      case 'all':
        dispatch(actions.filterAll(newTodo));
        break;

      default:
        break;
    }
  }, [option, query]);

  const handleClearQuery = () => {
    setQuery('');
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
            value={option}
            onChange={handleSelectChange}
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
          value={query}
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
              aria-label="close"
            />
          )}

        </span>
      </p>
    </form>
  );
};
