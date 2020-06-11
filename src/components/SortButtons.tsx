/* eslint-disable import/no-duplicates */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as selector from '../store';
import * as actionCreator from '../store';

const SortButtons = () => {
  const todos = useSelector(selector.getLoadedTodos);
  const dispatch = useDispatch();

  return (
    <div className="sorting-btns" hidden={todos.length === 0}>
      <button
        type="button"
        className="btn btn-success btn-sort"
        onClick={() => {
          dispatch(actionCreator.setSortBy('title'));
          dispatch(actionCreator.changeReverse());
        }}
      >
        Sort by Title
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sort"
        onClick={() => {
          dispatch(actionCreator.setSortBy('id'));
          dispatch(actionCreator.changeReverse());
        }}
      >
        Sort by ID
      </button>
      <button
        type="button"
        className="btn btn-warning btn-sort"
        onClick={() => {
          dispatch(actionCreator.setSortBy('user'));
          dispatch(actionCreator.changeReverse());
        }}
      >
        Sort by User
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sort"
        onClick={() => dispatch(actionCreator.setSortBy(''))}
      >
        RESET
      </button>
    </div>
  );
};

export default SortButtons;
