import React, { useEffect, useState } from 'react';
import './TodosList.scss';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTodos, getUser } from '../../api';
import { loadTodosAction, loadUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';

export const TodosList: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectTodo, setSelectTodo] = useState('');

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const handleClick = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTitle(value);
  };

  const handleSearchStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectTodo(value);
  };

  const changedTodos = () => {
    const copyTodos = todos.filter(todo => todo.title.toLowerCase()
      .includes(searchTitle.toLowerCase()));

    if (selectTodo === 'active') {
      return copyTodos.filter(todo => !todo.completed);
    }

    if (selectTodo === 'completed') {
      return copyTodos.filter(todo => todo.completed);
    }

    return copyTodos;
  };

  const getSelectedTodos = changedTodos();

  const changeStatus = (userId: number) => {
    const newTodoStatus = todos.map(todo => {
      if (todo.id === userId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    dispatch(loadTodosAction(newTodoStatus));
  };

  const deleteTodo = (todoId: number) => {
    const afterDeletingTodo = todos.filter(todo => todoId !== todo.id);

    dispatch(loadTodosAction(afterDeletingTodo));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__search">
        <label htmlFor="search-query" className="label">
          Search todo
          <div className="control">
            <input
              type="text"
              id="search-query"
              className="TodoList__item"
              placeholder="Type search todo"
              value={searchTitle}
              onChange={handleSearchTitle}
            />
          </div>
        </label>
      </div>
      <div className="select">
        <select
          name="selectTodo"
          value={selectTodo}
          onChange={handleSearchStatus}
          className="TodoList__item"
        >
          <option value="all">Show all</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {getSelectedTodos.map(todo => (
            <li
              className={classNames('TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed })}
              key={todo.id}
            >
              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              <label htmlFor="search-query">
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                  onChange={() => changeStatus(todo.id)}
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
                User #
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
