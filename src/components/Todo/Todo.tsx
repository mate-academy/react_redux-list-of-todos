import React from 'react';
import './Todo.scss';

export const Todo = ({ todo }: any) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
      <p>{todo.title}</p>
    </label>

    <button
      className="button TodoList__user-button"
      type="button"
    >
      {`User #${todo.userId}`}
    </button>
  </>
)
