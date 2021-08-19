import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filters } from '../../helpers';

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
    <form>
      <input
        type="text"
        name="filterTitle"
        value={searchQuery}
        placeholder="filter todos"
        onChange={(event) => {
          dispatch(setSearchQuery(event.target.value));
        }}
      />

      <select
        name="filterStatus"
        value={filterStatus}
        onChange={(event) => {
          dispatch(setFilterStatus(event.target.value));
        }}
      >
        {filtersKeys.map(filterKey => (
          <option key={filterKey}>{filters[filterKey]}</option>
        ))}
      </select>
    </form>
  );
};
