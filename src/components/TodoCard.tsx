import React from 'react';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => (
  <>
    <h5 className="todo__user">{todo.user ? todo.user.name : 'Unknown'}</h5>
    <span>{todo.title}</span>
    <i className="secondary-content">
      {todo.completed
        ? <i className="material-icons">Completed</i>
        : <i className="material-icons color-red">In Process</i>}
    </i>
  </>
);
