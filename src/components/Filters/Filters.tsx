import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filters } from '../../helpers';
import './Filters.scss';

import {
  setSearchQuery, getSearchQuery,
  setFilterStatus, getFilterStatus
} from '../../store';

export const Filters = () => {
  const filtersKeys = Object.keys(filters);

  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const filterStatus = useSelector(getFilterStatus);

  return (
    <form className="TodoList__list-filters">
      <input
        type="text"
        name="filterTitle"
        value={searchQuery}
        placeholder="filter todos"
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(setSearchQuery(e.target.value));
        }}
      />

      <select
        name="filterStatus"
        value={filterStatus}
        onChange={(e) => {
          console.log(e.target.value);
          dispatch(setFilterStatus(e.target.value));
        }}
      >
        {filtersKeys.map(filterKey => (
          <option key={filterKey}>{filters[filterKey]}</option>
        ))}
      </select>
    </form>
  );
};
