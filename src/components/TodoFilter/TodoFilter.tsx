import { useEffect, useState } from 'react';
import { actions } from '../../features/filter';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoFilter = () => {
  const todos = useAppSelector(store => store.todos);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    dispatch(actions.filter(todos, filterBy, query));
  }, [todos, query, filterBy]);

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  const resetInput = () => {
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
            value={filterBy}
            onChange={handlerSelect}
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
          onChange={handlerInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
