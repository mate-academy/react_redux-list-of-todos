/*eslint-disable*/
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { actions as filterActions } from "../../features/filter";
import { SORT } from "../../types/SortEnum";

export const TodoFilter: React.FC = () => {
  const { query, sort } = useAppSelector((state) => state.filter);
  const dispatch = useDispatch();

  const updateSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setSort(event.target.value as SORT));
  };

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select value={sort} onChange={updateSort} data-cy="statusSelect">
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
          onChange={updateQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: "all" }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.clearQuery())}
            />
          )}
        </span>
      </p>
    </form>
  );
};
