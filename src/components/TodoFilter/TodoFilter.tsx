import {
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_ACTIONS } from '../../features/filter';
import { FILTER_SELECTOR } from '../../features/selectors';

export const TodoFilter: React.FC = () => {
  const { status } = useSelector(FILTER_SELECTOR.filter);

  const dispach = useDispatch();

  const [query, setQuery] = useState('');

  const handelSelectFiter = (statusPayload: string) => {
    dispach(FILTER_ACTIONS.setStatus(statusPayload));
  };

  const handelSearchQuery = (
    queryPayload: string,
  ) => {
    dispach(FILTER_ACTIONS.setQuery(queryPayload));
    setQuery(queryPayload);
  };

  const handelCloseSearch = () => {
    dispach(FILTER_ACTIONS.setQuery(''));
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => handelSelectFiter(event.target.value)}
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
          onChange={(event) => handelSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
          && (
            <button
              data-cy="clearSearchButton"
              aria-label="Mute volume"
              type="button"
              className="delete"
              onClick={handelCloseSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
