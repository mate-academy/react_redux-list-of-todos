import React from 'react';
import { connect } from 'react-redux';

import {
  sortByName,
  sortByTitle,
  sortById,
} from './store';

const SortButtons = ({
  sortByName,
  sortByTitle,
  sortById,
}) => {
  return (
    <div className="sort-buttons">
    <h2>
       Sort by:
     </h2>
     <button
       type="button"
       onClick={sortById}
      className="sort-buttons__btn"
    >
      ID
    </button>
    <button
      type="button"
      onClick={sortByTitle}
      className="sort-buttons__btn"
    >
      Task
    </button>
    <button
      type="button"
      onClick={sortByName}
      className="sort-buttons__btn"
    >
      User
    </button>
  </div>
  );
};

const getMethods = dispatch => ({
  sortByName: () => dispatch(sortByName()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortById: () => dispatch(sortById()),
})

export default connect(getMethods)(SortButtons);
