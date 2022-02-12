import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import './TodoList.scss';
import { getUser, removeTodo, getFilteredTodosByStatus } from '../../api/api';
import { loadTodosAction, loadUserAction, setStatusAction } from '../../store/actions';
import { getTodosSelector, getUserIdSelector, getTodoStatusSelector } from '../../store/selectors';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getUserIdSelector);
  const statusTodo = useSelector(getTodoStatusSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getFilteredTodosByStatus(statusTodo);

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, [todos]);

  const handleUserInfo = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusAction(event.target.value));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filterTodos = (todosToFilter: Todo[]) => (
    todosToFilter.filter(todo => todo.title.includes(query.toLowerCase()))
  );

  const todosToShow = filterTodos(todos);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <form className="TodoList__form">
        <p>Find todo</p>
        <input
          className="input is-info"
          placeholder="Enter todo title"
          type="text"
          value={query}
          onChange={handleChangeQuery}
        />

        <p>Select todo status</p>
        <div className="select is-info">
          <select
            name="todoStatus"
            value={statusTodo}
            onChange={handleChangeStatus}
          >
            <option value="all">All</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>
      </form>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todosToShow.map(todo => (
            <li
              key={todo.id}
              className={cn(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__buttons">
                <button
                  className={cn(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => handleUserInfo(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className="button CurrentUser__button"
                  type="button"
                  onClick={() => removeTodo(todo.id)}
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
