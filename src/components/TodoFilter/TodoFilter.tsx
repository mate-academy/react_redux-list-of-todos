import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

/* type Props = {
  setHasSearchError: (value: boolean) => void;
} */

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const { query, sort } = useAppSelector(state => state.filter);

  const handleSortChange = ((event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.sortChange(event.target.value));
  });

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.queryAdd(event.target.value));
  };

  const handleQueryClear = () => {
    dispatch(actions.queryClear());
    // setHasSearchError(false);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={sort}
            onChange={handleSortChange}
            data-cy="statusSelect"
          >
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
          value={query}
          onChange={handleQueryChange}

        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="delete"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
