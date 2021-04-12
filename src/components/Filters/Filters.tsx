import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';

import {
  getQuery, setQuery, setTodos, getListOfTodos,
} from '../../store';

export const Filters = () => {
  const dispatch = useDispatch();
  const currentTodos = useSelector(getListOfTodos);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const query = useSelector(getQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string | null) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 500), [],
  );

  const sortBySelector = useCallback((sortQuery) => {
    if (sortQuery) {
      searchParams.set('sortBy', sortQuery);
    } else {
      searchParams.delete('sortBy');
    }

    history.push({ search: searchParams.toString() });
  }, [sortBy]);

  const handleRandom = () => {
    const todos = [...currentTodos];

    for (let indx = todos.length - 1; indx > 0; indx -= 1) {
      const newIndx = Math.floor(Math.random() * (indx + 1));
      const temp = todos[indx];

      todos[indx] = todos[newIndx];
      todos[newIndx] = temp;
    }

    dispatch(setTodos(todos));
  };

  return (
    <div className="TodoList">
      <h2>List of Todos:</h2>
      <div className="TodoList__container">
        <button
          type="button"
          className="Randomize"
          onClick={handleRandom}
        >
          Randomize
        </button>
        <label>
          <input
            type="text"
            name="title"
            value={query}
            placeholder="Filter by title"
            onChange={(e) => {
              const { value } = e.target;

              dispatch(setQuery(value));
              applyQuery(value);
            }}
          />
        </label>
        <select
          name="status"
          value={sortBy}
          onChange={(e) => {
            const { value } = e.target;

            sortBySelector(value);
          }}
        >
          <option value="">Choose status</option>
          <option value="all">All</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
      </div>
    </div>
  );
};
