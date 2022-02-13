import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './TodoList.scss';

import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos } from '../../api/todos';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { getUser } from '../../api/user';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectorValue, setSelectorValue] = useState(0);

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const handleRandomizer = () => {
    const randomOrder = todos.sort(() => Math.random() - 0.5);

    dispatch(loadTodosAction(randomOrder));
  };

  const handleClick = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const todosFromServer = await getTodos();

    dispatch(loadTodosAction(todosFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getFiltredTodos = (todos1: Todo[], status: boolean) => {
    return todos1.filter(todo => todo.completed === status);
  };

  const getFilteredData = () => {
    if (query) {
      const filterTodos = todos.filter((todo) => {
        const lowerCaseQuery = query.toLowerCase();

        return (
          todo.title.toLowerCase().includes(lowerCaseQuery)
        );
      });

      if (selectorValue === 1) {
        return getFiltredTodos(filterTodos, false);
      }

      if (selectorValue === 2) {
        return getFiltredTodos(filterTodos, true);
      }

      return filterTodos;
    }

    switch (selectorValue) {
      case 1:
        return getFiltredTodos(todos, false);
      case 2:
        return getFiltredTodos(todos, true);
      default:
        return todos;
    }
  };

  const filteredTodoList = getFilteredData();

  return (
    <div className="TodoList">
      <input
        type="text"
        id="search-query"
        className="input"
        placeholder="Type search word"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <select
        className="select"
        value={selectorValue}
        onChange={event => setSelectorValue(+event.target.value)}
      >
        <option value="0">all</option>
        <option className="select select--active" value="1">active</option>
        <option className="select select--completed" value="2">completed</option>
      </select>

      <button
        type="button"
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        onClick={() => handleRandomizer()}
      >
        Randomize
      </button>

      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodoList.map(todo => (
            <li key={todo.id} className={cn('TodoList__item', { 'TodoList__item--unchecked': !todo.completed }, { 'TodoList__item--checked': todo.completed })}>
              <label htmlFor={`Todo-${todo.id}`}>
                <input
                  id={`Todo-${todo.id}`}
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => handleClick(todo.userId)}
              >
                {todo.userId}
              </button>
              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
