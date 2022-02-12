import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import { deleteTodoFromServer, getTodos } from '../../api/todos';
import { loadTodos, changeUserId, deleteTodo } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const todos = useSelector(getTodosSelector);

  const handleClick = (userId: number) => {
    dispatch(changeUserId(userId));
  };

  const loadTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    dispatch(loadTodos(todosFromServer));
  };

  const changeTodoStatus = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    dispatch(loadTodos(updatedTodos));
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const getFilteredTodos = (): Todo[] => {
    const filteredTodosByTitle = todos
      .filter(todo => todo.title.includes(query));

    switch (status) {
      case 'active':
        return filteredTodosByTitle.filter(todo => !todo.completed);
      case 'completed':
        return filteredTodosByTitle.filter(todo => todo.completed);
      default:
        return filteredTodosByTitle;
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodoFromServer(todoId);
    dispatch(deleteTodo(todoId));
  };

  const visibleTodos = getFilteredTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        className="input"
        value={query}
        onChange={handleSearchInput}
      />
      <select
        value={status}
        onChange={handleSelectChange}
        className="select is-link m-3"
      >
        <option value="all">Show all</option>
        <option value="completed">Show completed</option>
        <option value="active">Show active</option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              className={ClassNames('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              key={todo.id}
            >
              <label htmlFor={String(todo.id)}>
                <input
                  type="checkbox"
                  readOnly
                  id={String(todo.id)}
                  checked={todo.completed}
                  onChange={() => changeTodoStatus(todo.id)}
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => handleClick(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--delete
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
