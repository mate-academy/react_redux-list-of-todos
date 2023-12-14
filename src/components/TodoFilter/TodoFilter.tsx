import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EStatus, actions as filterActions } from '../../features/filter';

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);
const QUERY_DELAY = 500;
const DEFAULT_QUERY_VALUE = '';

export const TodoFilter: React.FC = () => {
  const [queryValue, setQueryValue] = useState(DEFAULT_QUERY_VALUE);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

  const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as EStatus));
  };

  const handleQueryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQueryValue(value);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newtimeoutId = setTimeout(() => {
      dispatch(filterActions.addQuery(value));
    }, QUERY_DELAY);

    setTimeoutId(newtimeoutId);
  };

  const handleClearButton = () => {
    dispatch(filterActions.clearQuery());
    setQueryValue(DEFAULT_QUERY_VALUE);
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
            onChange={handleSelectStatus}
          >
            {Object.values(EStatus).map((status) => {
              const capStatus = capitalize(status);

              return (
                <option key={capStatus} value={status}>{capStatus}</option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={queryValue}
          onChange={handleQueryFilter}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {queryValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="clear"
              className="delete"
              onClick={handleClearButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
