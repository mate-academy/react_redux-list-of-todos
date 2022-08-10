import { FC } from 'react';

interface Props {
  handleQuery: (input: string) => void
  query:string
  handleTarget: (target: string) => void
  applyQuery: (str: string) => void
}

export const TodoFilter:FC<Props> = ({
  handleQuery,
  query,
  handleTarget,
  applyQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            defaultValue="all"
            onChange={(event) => {
              handleTarget(event.target.value);
            }}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(ev) => {
            handleQuery(ev.target.value);
            applyQuery(ev.target.value);
          }}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right">
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              type="button"
              className="delete has-text"
              onClick={() => handleQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
