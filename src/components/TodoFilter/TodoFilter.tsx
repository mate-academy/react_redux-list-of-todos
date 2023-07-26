import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    query,
    status,
  } = useAppSelector(state => state.filter);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.set({
      query: value,
      status,
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => {
              const { value } = event.target;

              dispatch(filterActions.set({
                query,
                status: value as Status,
              }));
              // if (value !== todoStatusFilter) {
              //   setStatusFilter(value as Status);
              // }
            }}
          >
            {Object.values(Status).map((st) => (
              <option key={st} value={st}>
                {st[0].toUpperCase() + st.slice(1)}
              </option>
            ))}
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
          onChange={handleChange}
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
              onClick={() => dispatch(filterActions.set({
                query: '',
                status,
              }))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
