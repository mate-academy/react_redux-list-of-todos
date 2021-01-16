import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import store, { filteredTodo } from '../../store';

export const TodoList = ({
  currentTodos,
  updateUserId,
  updateTodos,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__control">
      <select
        className="TodoList__control__selected"
        onChange={(event) => {
          updateTodos(event.target.value);
        }}
      >
        <option>All</option>
        <option>active</option>
        <option>completed</option>
      </select>
      <input
        type="text"
        className="TodoList__control__search"
        placeholder="search for todo by name"
        onChange={(event) => {
          store.dispatch({ type: 'FIND_VALUE_IN_TITLE', inputValue: event.target.value })
        }}
      />
      <button
        type="button"
        onClick={() => {
          const randomNumber = Math.floor(Math.random() * currentTodos.length);
          const randomArrTodo = [];

          // eslint-disable-next-line no-plusplus
          for (let i = randomNumber; i < currentTodos.length; i++) {
            randomArrTodo.push(currentTodos[i]);
          }

          // eslint-disable-next-line no-plusplus
          for (let i = randomNumber - 1; i >= 0; i--) {
            randomArrTodo.push(currentTodos[i]);
          }

          filteredTodo(randomArrTodo);
        }}
      >
        Randomize
      </button>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {console.log(currentTodos)}
        {
          currentTodos.map(todo => {
            return (
              <li key={todo.id}
                className={
                  classnames('TodoList__item', `${todo.completed
                    ? 'TodoList__item--checked'
                    : 'TodoList__item--unchecked'}`)
                }
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      filteredTodo(currentTodos.map(newTodo => (
                        newTodo.id === todo.id
                          ? {
                            ...newTodo, completed: !todo.completed,
                          } : newTodo)));
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                TodoList__user-button
                button
              "
                  type="button"
                  onClick={() => {
                    updateUserId(`${todo.userId}`);
                  }}
                >
                  User&nbsp;#
              {todo.userId}
                </button>
              </li>
            )
          }
          )}
      </ul>
    </div>
  </div>
);
