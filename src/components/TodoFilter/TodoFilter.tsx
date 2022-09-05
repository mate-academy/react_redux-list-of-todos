import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterType } from '../../types/FilterType';
import { actions as todosActions } from '../../store/todos';

// const debounce = (func: (arg: string) => void, delay: number) => {
//   let timerId: number;
//
//   return (...args: string[]) => {
//     clearInterval(timerId);
//
//     timerId = window.setTimeout(func, delay, ...args);
//   };
// };

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  console.log(appliedQuery); // eslint-disable-line

  // const applyInputValue = useCallback(
  //   debounce(setAppliedQuery, 400), [appliedQuery],
  // );

  useEffect(() => {
    switch (filterBy) {
      case FilterType.ALL:
        dispatch(todosActions.clearFilter(query));

        break;
      case FilterType.COMPLETED:
        dispatch(todosActions.setFilterByCompleted(query));

        break;
      case FilterType.ACTIVE:
        dispatch(todosActions.setFilterByActive(query));

        break;
      default:
        dispatch(todosActions.clearFilter(query));
    }
  }, [filterBy, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(event) => setFilterBy(event.target.value)}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
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
          onChange={({ target }) => {
            setQuery(target.value);
            setAppliedQuery(target.value);
          }}
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
              onClick={() => {
                setQuery('');
                setAppliedQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
