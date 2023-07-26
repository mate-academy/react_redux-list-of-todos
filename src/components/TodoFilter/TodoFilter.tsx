import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

interface Props {
  query: string;
  todoStatusFilter: Status;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  todoStatusFilter,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(filterActions.set({
      query: value,
      status: todoStatusFilter,
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatusFilter}
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
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status[0].toUpperCase() + status.slice(1)}
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
                status: todoStatusFilter,
              }))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
