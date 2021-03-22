import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelector, todoFilterQuery, setQuery, stateTodos, setTodos } from '../store';
import { ALL, ACTIVE, COMPLETED } from '../constants';

export const FilterTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(stateTodos);
  const filterQuery = useSelector(todoFilterQuery);

  const shuffleTodos = () => {
    const shuffledTodos = [...todos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledTodos[i], shuffledTodos[j]]
        = [shuffledTodos[j], shuffledTodos[i]];
    }

    dispatch(setTodos(shuffledTodos));
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Filter todos by title</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={filterQuery}
            onChange={(event) => dispatch(setQuery(event.target.value))}
          />
        </div>
      </div>

      <div className="col-3">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label
              className="input-group-text"
              htmlFor="inputGroupSelect01"
            >
              Show todos
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={(event) => (
              dispatch(changeSelector(event.target.value))
            )}
          >
            <option value={ALL}>All</option>
            <option value={ACTIVE}>Active</option>
            <option value={COMPLETED}>Completed</option>
          </select>
        </div>
      </div>

      <div className="col-3">
        <button
          type="button"
          className="btn btn-warning ml-5"
          onClick={() => shuffleTodos()}
        >
          randomize
        </button>
      </div>
    </div>
  );
};
