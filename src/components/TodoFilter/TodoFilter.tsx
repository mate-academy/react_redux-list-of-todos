// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';
// import { queue } from 'cypress/types/jquery';
const { setFilter } = actions;

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const FilterQuery = useAppSelector(state => state.filter.query);
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as Status;

    dispatch(
      setFilter({
        query: '',
        status: selectedStatus,
      }),
    );
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const selectedStatus = event.target.value as Status;
    const query = event.target.value;

    dispatch(
      setFilter({
        query,
        status,
      }),
    );
  };

  const handleClean = () => {
    dispatch(
      setFilter({
        query: '',
        status,
      }),
    );
  };

  useEffect(() => {}, [FilterQuery]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          value={FilterQuery}
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClean}
          />
        </span>
      </p>
    </form>
  );
};
