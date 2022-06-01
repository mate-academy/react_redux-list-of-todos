import React, { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import {
  getCompleteQuerySelector,
  getIsRandomizedSelector,
  getIsTodosSortedSelector,
  getTitleQuerySelector,
  getTodosSelector,
  getVisibleTodosSelector,
} from '../../store/TodosReducer/selectors';

import './TodoListControlPanel.scss';
import {
  filterTodos,
  randomizeTodos,
  setCompleteQueryAction,
  setIsRandomizedAction,
  setIsTodosSortedAction,
  setTitleQueryAction,
  setVisibleTodosAction,
  sortTodos,
} from '../../store/TodosReducer/actions';

export const TodoListControlPanel: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const visibleTodos = useSelector(getVisibleTodosSelector);
  const filterTitle = useSelector(getTitleQuerySelector);
  const filterComplete = useSelector(getCompleteQuerySelector);
  const isRandomized = useSelector(getIsRandomizedSelector);
  const isTodosSorted = useSelector(getIsTodosSortedSelector);

  const handleRandomized = useCallback(() => {
    dispatch(setIsTodosSortedAction(false));

    if (isRandomized) {
      dispatch(setVisibleTodosAction(todos));
      dispatch(filterTodos());
      dispatch(setIsRandomizedAction(false));

      return;
    }

    dispatch(randomizeTodos());
    dispatch(setIsRandomizedAction(true));
  }, [isRandomized, visibleTodos]);

  const applyQuery = useCallback(
    debounce(() => {
      dispatch(filterTodos());
    }, 500),
    [],
  );

  const handleSort = useCallback(() => {
    dispatch(setIsRandomizedAction(false));

    if (isTodosSorted) {
      dispatch(setVisibleTodosAction(todos));
      dispatch(filterTodos());
      dispatch(setIsTodosSortedAction(false));

      return;
    }

    dispatch(sortTodos());
    dispatch(setIsTodosSortedAction(true));
  }, [isTodosSorted]);

  useEffect(() => {
    applyQuery();
  }, [filterTitle, filterComplete]);

  return (
    <div className="TodoList__controlPanel controlPanel">
      <label
        className="controlPanel__titleFilter"
      >
        Filter:
        <input
          type="text"
          value={filterTitle}
          onChange={({ target }) => {
            dispatch(setTitleQueryAction(target.value.toLowerCase()));
          }}
          className="controlPanel__titleFilterInput"
          data-cy="filterByTitle"
        />
      </label>

      <label
        className="controlPanel__completedFilter"
      >
        Show:
        <select
          name="visibleGoods"
          value={filterComplete}
          onChange={({ target }) => {
            dispatch(setCompleteQueryAction(target.value));
          }}
          className="controlPanel__completedFilterSelect"
        >
          <option value="all">
            All
          </option>

          <option value="active">
            Active
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => {
          handleSort();
        }}
        className="button"
      >
        {isTodosSorted ? 'Unsorted' : 'Sort'}
      </button>

      <button
        type="button"
        onClick={() => handleRandomized()}
        className="button"
      >
        {isRandomized ? 'Back to normal' : 'Randomize list'}
      </button>
    </div>
  );
});
