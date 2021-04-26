import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from '../../helpers';
import { Todo } from '../Todo/Todo';
import './TodoList.scss';
import {
  setQuery,
  getQuery,
  setFilterType,
  getFilterType,
} from '../../store/index';

export const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const dispatch = useDispatch();
  const query = useSelector(getQuery);
  const filterType = useSelector(getFilterType);

  const downloadTodos = async () => {
    const result = await loadTodos();

    setTodos(result);
  };

  const filterByStatus = (alltTodos, status) => {
    const completedTodos = alltTodos.filter(todo => todo.completed);
    const uncompletedTodos = alltTodos.filter(todo => !todo.completed);

    switch (status) {
      case 'completed':
        return completedTodos;

      case 'uncompleted':
        return uncompletedTodos;

      case 'all':
      default: return todos;
    }
  };

  const filteredTodos = useMemo(() => {
    const result = filterByStatus(todos, filterType);

    return result.filter(todo => {
      const title = todo.title.toLowerCase();
      const currentQuery = query.toLowerCase();

      return title.includes(currentQuery);
    });
  }, [filterType, todos, query]);

  const queryHandler = (event) => {
    const { value } = event.target;

    dispatch(setQuery(value));
  };

  const setFilter = (event) => {
    const { value } = event.target;

    dispatch(setFilterType(value));
  };

  useEffect(() => {
    downloadTodos();
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          placeholder="find ToDo"
          name="query"
          value={query}
          onChange={queryHandler}
        />
        <select
          value={filterType}
          name="option"
          onChange={setFilter}
        >
          <option value="initial" disabled>
            choose parameter
          </option>
          <option
            value="completed"
          >
            completed
          </option>
          <option value="uncompleted">
            uncompleted
          </option>
          <option value="all">
            all
          </option>
        </select>
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <Todo
              key={todo.id}
              completed={todo.completed}
              userId={todo.userId}
              title={todo.title}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
