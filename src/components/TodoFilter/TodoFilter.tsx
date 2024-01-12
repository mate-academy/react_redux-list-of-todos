import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterStatus } from '../../types/enums/FilterStatus';
import { actions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useAppSelector(state => state.filter);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(actions.setFilter(status));
  }, [dispatch, status]);

  const handleQuerySumbit = () => {
    dispatch(actions.setQuery(query));
  };

  const handleClearQuery = () => {
    dispatch(actions.setQuery(''));
    setQuery('');
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption
      = FilterStatus[e.target.value as keyof typeof FilterStatus];

    dispatch(actions.setFilter(selectedOption));
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
            value={status}
            onChange={handleSelectChange}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
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
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleQuerySumbit}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearQuery}
          />
        </span>
      </p>
    </form>
  );
};
