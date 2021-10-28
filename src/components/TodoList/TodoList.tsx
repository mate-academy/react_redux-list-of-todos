import './TodoList.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames';
import {
  todosFetchData, addInput, addSelect, chooseUserId, deleteTodo,
} from '../../store/todos/actionTodos';

export const TodoList: React.FC<{}> = () => {
  const { todosToRender, input, select } = useSelector((state: Initial) => state.reducerTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosFetchData());
  }, []);

  useEffect(() => {
    dispatch(todosFetchData());
  }, [select, input]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          value={input}
          onChange={event => dispatch(addInput(event.target.value))}
        />
        <select
          value={select}
          onChange={event => dispatch(addSelect(event.target.value))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>

        </select>
        <ul className="TodoList__list">
          {todosToRender.map(todo => {
            const {
              id, title, userId, completed,
            } = todo;

            return (
              <li
                className={className('TodoList__item', `TodoList__item--${
                  completed ? 'checked' : 'unchecked'
                }`)}
                key={id}
              >
                <label htmlFor={title}>
                  <input type="checkbox" id={title} readOnly checked={completed} />
                  <p>{title}</p>
                </label>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    dispatch(todosFetchData(userId));
                    dispatch(chooseUserId(userId));
                  }}
                >
                  {`User#${userId}`}
                </button>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => {
                    dispatch(deleteTodo(id));
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
