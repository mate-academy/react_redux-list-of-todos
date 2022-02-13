// import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodos, getTodos } from '../../api/todos';
import { loadTodoAction, loadUserAction, userErrorAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { getUser } from '../../api/users';

export const TodoList = () => {
  const dispatch = useDispatch();

  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentSorting, setCurrentSorting] = useState<string>('all');

  const todos = useSelector(getTodosSelector);

  const lowerCaseCurrentInput = currentInput.toLowerCase();

  let filteredTodos = todos.filter((value) => {
    if (value.title.toLowerCase().includes(lowerCaseCurrentInput)) {
      return true;
    }

    return false;
  });

  switch (currentSorting) {
    case 'active':
      filteredTodos = filteredTodos.filter((value) => (!value.completed));
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter((value) => (value.completed));
      break;
    default:
      break;
  }

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodoAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const handleClick = async (userId: number) => {
    try {
      const dataUser = await getUser(userId);

      dispatch(loadUserAction(dataUser));
      dispatch(userErrorAction(false));
    } catch (e) {
      dispatch(userErrorAction(true));
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSorting(event.target.value);
  };

  const handleDeleteTodo = async (todoId: number) => {
    const todosFromServer = await deleteTodos(todoId);

    dispatch(loadTodoAction(todosFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__all-inputs">
        <input
          className="input is-info"
          type="text"
          value={currentInput}
          onChange={handleInput}
        />
        <div className="select is-link">
          <select
            value={currentSorting}
            onChange={changeStatus}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed </option>
          </select>
        </div>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label htmlFor="checkTodo">
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>
              <div>
                <button
                  className="TodoList__user-button TodoList__user-button--selected button"
                  type="button"
                  onClick={() => handleClick(todo.userId)}
                >
                  { `User #${todo.userId}` }
                </button>
                <button
                  className="TodoList__user-button TodoList__user-button--selected button"
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
