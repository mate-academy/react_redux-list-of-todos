import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterSlice } from "../../features/filter";

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const changeFilterStatus = (filerStatus: string) =>
    dispatch(filterSlice.actions.changeFilterStatus(filerStatus));
  const changeFilterQuery = (filerQuery: string) =>
    dispatch(filterSlice.actions.changeFilterQuery(filerQuery));

  const [value, setValue] = useState("");

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => changeFilterStatus(e.target.value)}
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
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            changeFilterQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value !== "" && (
          <span className="icon is-right" style={{ pointerEvents: "all" }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setValue("");
                changeFilterQuery("");
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
