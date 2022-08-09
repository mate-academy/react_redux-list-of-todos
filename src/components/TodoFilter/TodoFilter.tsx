import { useEffect, useState } from 'react';

type Props = {
  onFilter: (query: string, condition: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [queryTodo, setQueryTodo] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    onFilter(queryTodo, condition);
  }, [queryTodo, condition]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          >
            <option value="">All</option>
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
          value={queryTodo}
          onChange={(event) => {
            setQueryTodo(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {queryTodo && (
          <>
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(_event) => setQueryTodo('')}
              />
            </span>
          </>
        )}
      </p>
    </form>
  );
};
