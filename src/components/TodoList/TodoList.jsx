import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../Todo';
import {
  fetchTodos,
  sortByType,
  sortByQuery,
  sortByActive,
  sortByCompleted,
} from '../../store/actions';

import './TodoList.scss';
import { sortByCategory, fetchedTodos } from '../../store/selectors';

function TodoList() {
  const sortedByType = useSelector(sortByCategory);
  const todos = useSelector(fetchedTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const filterByTitle = (event) => {
    const { value } = event.target;

    dispatch(sortByQuery(value));
  };

  const onChange = (event) => {
    dispatch(sortByType(event.target.value));
    selectCategory(event.target.value);
  };

  const selectCategory = (value) => {
    switch (value) {
      case 'completed':
        dispatch(sortByCompleted());
        break;

      case 'active':
        dispatch(sortByActive());
        break;

      default:
        dispatch(sortByActive());
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <>
        <input
          className="input is-rounded"
          type="text"
          placeholder="type title here"
          onChange={filterByTitle}
        />
        <div className="select is-rounded">
          <select
            value={sortedByType}
            onChange={onChange}
          >
            <option>all</option>
            <option>active</option>
            <option>completed</option>
          </select>
        </div>
      </>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
