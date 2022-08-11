/* eslint-disable no-debugger */
/* eslint-disable no-console */
type Props = {
  query: string,
  onReset: () => void,
  onApplyQuery: (query1: string) => void,
  onHandleInputQuery: (inputQuery: string) => void,
  onHandleFilterType: (selectType: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onReset,
  onApplyQuery,
  onHandleInputQuery,
  onHandleFilterType,
}) => {
  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={event => onHandleFilterType(event.target.value)}
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
            onChange={event => {
              onHandleInputQuery(event.target.value);
              onApplyQuery(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {query && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  onReset();
                  onHandleInputQuery('');
                }}
              />
            )}
          </span>
        </p>
      </form>
    </>
  );
};
