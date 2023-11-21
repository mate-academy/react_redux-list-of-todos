import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

interface Props {
  setIsTodosLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoFilter: React.FC<Props> = ({ setIsTodosLoading }) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const [query, setQuery] = useState('');

  const debouncedQueryChange = useCallback(
    debounce((value: string) => {
      dispatch(actions.setQuery(value));
      setIsTodosLoading(false);
    }, 500), [],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsTodosLoading(true);

    debouncedQueryChange(event.target.value);
  };

  const onReset = () => {
    setQuery('');
    dispatch(actions.setQuery(''));
  };

  const onStatusChange = (
    event: React.SyntheticEvent<HTMLSelectElement, Event>,
  ) => {
    const currentStatus = event.currentTarget.value as Status;

    dispatch(actions.setStatus(currentStatus));
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
            onChange={onStatusChange}
            defaultValue={filter.status}
          >
            {Object.entries(Status).map(([key, value]) => (
              <option value={value} key={key}>{key}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={onQueryChange}
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
              onClick={onReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
