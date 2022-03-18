import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, getUser } from '../../api';
import {
  loadTodosActions,
  loadUserAction,
  setStatusValue,
  setTitleValue,
} from '../../store/actions';
import {
  getStatusValue,
  getTitleValue,
  getTodosSelector,
  getUserSelector,
} from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const title = useSelector(getTitleValue);
  const status = useSelector(getStatusValue);
  const user = useSelector(getUserSelector);

  const handleSelectUser = async (userId: number) => {
    if (user?.id !== userId) {
      const getUserFromServer = await getUser(userId);

      dispatch(loadUserAction(getUserFromServer));
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleValue(event.target.value));
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusValue(event.target.value));
  };

  const filteredTodos = () => {
    let todosCopy = [...todos];

    if (title) {
      todosCopy = todosCopy.filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));
    }

    switch (status) {
      case 'active':
        todosCopy = todos.filter(todo => !todo.completed);
        break;
      case 'complited':
        todosCopy = todos.filter(todo => todo.completed);
        break;

      default:
        return todosCopy;
    }

    return todosCopy;
  };

  const filterTodos = filteredTodos();

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosActions(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const delateTodo = (todoId: number) => {
    dispatch(loadTodosActions(todos.filter(todo => todo.id !== todoId)));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="title">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitle}
          className="input TodoList__findByTitle"
          placeholder="Find by title"
        />
      </label>

      <div className="select TodoList__findByComplited">
        <select
          value={status}
          onChange={handleStatus}
        >
          <option value="">All</option>
          <option value="complited">Complited</option>
          <option value="active">Active</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor={`checkbox-${todo.id}`}>
                <input
                  type="checkbox"
                  id={`checkbox-${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__flex">
                <button
                  type="button"
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button
                "
                  onClick={() => {
                    delateTodo(todo.id);
                  }}
                >
                  Delate
                </button>

                <button
                  type="button"
                  className="
                TodoList__user-button
                TodoList__user-button--selected
                button
                "
                  onClick={() => {
                    handleSelectUser(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
