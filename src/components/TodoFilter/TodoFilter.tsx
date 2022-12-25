import {
  FC, memo, useCallback, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { useAppSelector } from '../../app/hooks';
import { changeStatus, clearQuery, setQuery } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: FC = memo(() => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);
  const [queryValue, setQueryValue] = useState(query);

  const filterTodo = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(changeStatus(event.target.value as Status));
  }, []);

  const clearInput = useCallback(() => {
    setQueryValue('');
    dispatch(clearQuery());
  }, []);

  const debounceUpdate = useCallback(
    debounce((value) => dispatch(setQuery(value)), 1000), [],
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQueryValue(newQuery);

    debounceUpdate(newQuery);
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
            onChange={filterTodo}
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
          value={queryValue}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="clear search"
            onClick={clearInput}
          />
        </span>
      </p>
    </form>
  );
});
