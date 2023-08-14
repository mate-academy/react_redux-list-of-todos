import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as filterActions } from '../../features/filter';
import { actions as todosActions } from '../../features/todos';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const initialStore = useSelector((state: RootState) => state.initialTodos);

  const query = useSelector((state: RootState) => state.filter.query);
  const [isSearched, setIsSearched] = useState(false);

  const filter = useSelector((state: RootState) => state.filter.status);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;

    dispatch(filterActions.set(query, newFilter));
    dispatch(todosActions.getFiltered(
      initialStore, query, newFilter,
    ));
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const prompt = e.target.value;

    dispatch(filterActions.setQuery(prompt));
    dispatch(todosActions.getFiltered(initialStore, prompt, filter));
    setIsSearched(true);

    if (prompt.length === 0) {
      setIsSearched(false);
    }
  };

  const handleQueryReset = () => {
    const prompt = '';

    dispatch(filterActions.setQuery(prompt));
    dispatch(
      todosActions.getFiltered(initialStore, prompt, filter),
    );
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
            value={filter}
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
