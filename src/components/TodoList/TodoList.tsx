// import { type } from 'os';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  setTodosAction, setUserAction, deleteTodoAction,
} from '../../store/action';
import { getFilteredTodosSelector }
  from '../../store/selectors';
import { getTodos, getUser } from '../api';

export const TodoList: React.FC = () => {
  const [inputValue, setinputValue] = useState('');
  const [selectValue, setselectValue] = useState('all');
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos('todos')
      .then(todos => {
        dispatch(setTodosAction(todos));
      });
  }, []);
  useEffect(() => {
    getTodos('todos')
      .then(todos => {
        dispatch(setTodosAction(todos));
      });
  }, []);
  let visibleTodo = useSelector(getFilteredTodosSelector(inputValue));

  const clickSelectUser = async (userId: number) => {
    const user = await getUser(userId);

    dispatch(setUserAction(user));
  };

  const deleteTodo = (todoId: number) => {
    dispatch(deleteTodoAction(todoId));
  };

  switch (selectValue) {
    case 'all':
      visibleTodo = visibleTodo.filter(todo => todo);
      break;
    case 'active':
      visibleTodo = visibleTodo.filter(todo => todo.completed === false);
      break;
    case 'completed':
      visibleTodo = visibleTodo.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <label htmlFor="input">
          Filter
          {' '}
          <input
            id="input"
            type="text"
            value={inputValue}
            onChange={(event) => setinputValue(event.target.value)}
          />
        </label>
        <select
          name="visibleTodos"
          id="visibleTodos"
          value={selectValue}
          onChange={(event) => setselectValue(event.target.value)}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>
        <ul className="TodoList__list">
          {visibleTodo.map(todo => (
            <li className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`} key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__buttons">
                <button
                  className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button"
                  type="button"
                  onClick={() => clickSelectUser(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
