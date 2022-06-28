/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import classname from 'classnames/bind';
import { deleteTodo, getTodos, getUserById } from '../../api/api';
import { setDeleteTodoAction, setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSeclectors, OptionValue } from '../../store/selectors';

export const TodoList:React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [optionValue, setOptionValue] = useState(' ');
  const todos = useSelector(getTodosSeclectors(optionValue, query));

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  const deleteTodoFromServer = async (id: number) => {
    await deleteTodo(id);
    const todosFromServer = await getTodos();

    dispatch(setDeleteTodoAction(todosFromServer));
  };

  return (
    <div className="TodoList">
      <input
        type="text"
        id="search-query"
        name="query"
        className="input"
        placeholder="Type search word"
        value={query}
        onChange={(event) => (
          setQuery(event.target.value)
        )}
      />
      <select
        value={optionValue}
        onChange={(event) => {
          setOptionValue(event.target.value);
        }}
      >
        <option disabled value=" ">Choose option</option>
        <option value={OptionValue.All}>All</option>
        <option value={OptionValue.Active}>Active</option>
        <option value={OptionValue.Completed}>Completed</option>

      </select>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classname('TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>
              <div>
                <button
                  className={classname('TodoList__user-button button',
                    { 'TodoList__user-button--selected': !todo.completed })}
                  type="button"
                  onClick={() => getUser(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
                <button
                  type="button"
                  className="button is-danger"
                  onClick={() => deleteTodoFromServer(todo.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
