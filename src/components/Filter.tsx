import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuery } from '../store';
import { setQuery } from '../store/query';
import { sortBy } from '../store/sort';


const Filter = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQuery);

  return (
    <div>
      <button className="btn sort-status-btn" type="button" onClick={() => dispatch(sortBy('completed'))}>
        Sort by status
      </button>

      <button className="btn sort-title-btn" type="button" onClick={() => dispatch(sortBy('title'))}>
        Sort by title
      </button>

      <button className="btn sort-user-btn" type="button" onClick={() => dispatch(sortBy('user'))}>
        Sort by user
      </button>

      <button className="btn reset-btn" type="button" onClick={() => dispatch(sortBy('id'))}>
        Reset
      </button>

      <input
        className="input"
        type="text"
        value={query}
        placeholder="Search by title"
        onChange={({ target }) => {
          dispatch(setQuery(target.value));
        }}
      />
    </div>
  );
};

export default Filter;
