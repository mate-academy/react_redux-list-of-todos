import { useCallback, useRef, useState } from 'react';

interface Props {
  onSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onAppliedQuery: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  onSort: onSort,
  onAppliedQuery: onAppliedQuery,
}) => {
  const timer = useRef(0);

  const debounce = useCallback(
    (callback: (value: string) => void, delay: number): (() => void) => {
      return (...args: any[]) => {
        if (timer.current !== 0) {
          window.clearTimeout(timer.current);
        }

        if (typeof args[0] === 'string') {
          timer.current = window.setTimeout(() => {
            callback(args[0]);
          }, delay);
        }
      };
    },
    [],
  );

  const applyQuery: typeof onAppliedQuery = debounce(onAppliedQuery, 500);
  const [query, setQuery] = useState('');

  const handlingInputChange = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  const handlingFilterCancel = () => {
    setQuery('');
    onAppliedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onSort}>
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
          onChange={event => handlingInputChange(event.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query ? (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handlingFilterCancel()}
            />
          ) : (
            ''
          )}
        </span>
      </p>
    </form>
  );
};
