import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SortType } from '../../types/Todo';
import { actions as filterActions } from '../../features/filter';

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
}) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value as SortType;

    switch (newSortType) {
      case SortType.ACTIVE:
        return dispatch(filterActions.active(SortType.ACTIVE));

      case SortType.COMPLETED:
        return dispatch(filterActions.completed(SortType.COMPLETED));

      default:
        return dispatch(filterActions.all(SortType.ALL));
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleReset = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSelect}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {query && (
            <>
              <button
                aria-label="reset"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleReset}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
