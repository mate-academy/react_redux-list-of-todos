import React from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <div
    className="card text-white bg-primary mb-3 item"
  >
    <div className="card-header posrel">
      <span>
        No.
        {todo.id}
      </span>
      <br />
      Status:
      {
        todo.completed
          ? ' Finished'
          : ' Active'
      }
      <button
        type="button"
        className="removeBtn"
      >
        X
      </button>
    </div>
    <div className="card-body">
      <h5 className="card-title">{todo.user ? todo.user.name : 'unknown'}</h5>
      <p className="card-text">{todo.title}</p>
    </div>
  </div>
);
