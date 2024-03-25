import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Status as SortType } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { actions as filterActions } from '../../features/filter';
import { useAppDispatch } from '../../app/hooks';

interface Props {
  todos: Todo[];
  loading: boolean;
}

export const TodoFilter: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => dispatch(filterActions.setQuery(value)), 400),
    [],
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedChangeHandler(value);
  };

  const handleClearQuery = () => {
    setQuery('');
    dispatch(filterActions.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              dispatch(filterActions.setFilter(event.target.value as SortType))
            }
          >
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChangeQuery}
          value={query}
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
              onClick={() => handleClearQuery()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
