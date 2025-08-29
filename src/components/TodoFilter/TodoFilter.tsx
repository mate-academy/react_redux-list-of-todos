import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const setSelectedFilter = (filter: string) => {
    dispatch(setStatus(filter));
  };

  const setSelectedQuery = (query: string) => {
    dispatch(setQuery(query));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedQuery('');
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={onSubmit}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          value={filter.query}
          onChange={(e) => setSelectedQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSelectedQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
