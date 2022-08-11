import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Todo } from '../../types/Todo';

interface Props {
  onSetVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

enum Selector {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({ onSetVisibleTodos }) => {
  const todos = useAppSelector(state => state.todos);
  const navigation = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigation(`?${searchParams}`, { replace: true });
    }, 500),
    [location.search],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const appliedSelect = searchParams.get('select') || '';
  const [selectFilter, setSelectFilter] = useState(appliedSelect);

  const handleSelectChange = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (target.value === Selector.all) {
      searchParams.delete('select');
    } else {
      searchParams.set('select', target.value);
    }

    navigation(`?${searchParams}`, { replace: true });
    setSelectFilter(target.value);
  };

  const selectFilterCallback = (todo: Todo) => {
    const pickFilterParam = (str: string) => {
      switch (location.search.includes(str)) {
        case str === '':
          return todo;

        case str === Selector.active:
          return !todo.completed;

        case str === Selector.completed:
          return todo.completed;

        default:
          return todo;
      }
    };

    return pickFilterParam(selectFilter || '');
  };

  useEffect(() => {
    onSetVisibleTodos(todos
      .filter(selectFilterCallback)
      .filter(todo => todo.title.toLowerCase()
        .includes(appliedQuery.toLowerCase())));
  }, [appliedQuery, selectFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
            value={appliedSelect || 'all'}
          >
            <option value={Selector.all}>All</option>
            <option value={Selector.active}>Active</option>
            <option value={Selector.completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onSetVisibleTodos(todos);
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
