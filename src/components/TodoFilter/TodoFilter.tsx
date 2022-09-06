import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType } from '../../types/FilterType';
import { selectors } from '../../store';
import { actions as filterActions } from '../../store/filter';

const debounce = (func: (arg: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearInterval(timerId);

    timerId = window.setTimeout(func, delay, ...args);
  };
};

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectors.getFilter);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyInputValue = useCallback(
    debounce(setAppliedQuery, 400), [appliedQuery],
  );

  useEffect(() => {
    dispatch(filterActions.setQuery(appliedQuery));
  }, [appliedQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => (
              dispatch(filterActions.setStatus(event.target.value))
            )}
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
            applyInputValue(target.value);
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
                applyInputValue('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
