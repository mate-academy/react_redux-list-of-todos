import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../store';

const SortButtons = () => {
  const dispatch = useDispatch();

  return (
    <p className="button_container">
      <button
        className="button btn btn-outline-info"
        onClick={() => dispatch(setSortType('id'))}
        type="button"
      >
        Sort by id
      </button>
      <button
        className="button btn btn-outline-info"
        onClick={() => dispatch(setSortType('title'))}
        type="button"
      >
        Sort by title
      </button>
      <button
        className="button btn btn-outline-info"
        onClick={() => dispatch(setSortType('userName'))}
        type="button"
      >
        Sort by user name
      </button>
    </p>
  );
};

export default SortButtons;
