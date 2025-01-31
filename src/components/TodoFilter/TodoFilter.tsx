import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setQuery(search));
  }, [search]);

  useEffect(() => {
    dispatch(setStatus(sort));
  }, [sort]);

  const handleSort = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(event.target.value);
    },
    [],
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSort}>
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
          value={search}
          onChange={e => handleSearch(e)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search !== '' ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          </span>
        ) : (
          <></>
        )}
      </p>
    </form>
  );
};
