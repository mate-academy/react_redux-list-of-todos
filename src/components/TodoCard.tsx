import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store';

type Props = {
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h5 className="todo__user">{todo.user ? todo.user.name : 'Unknown'}</h5>
      <button
        className="remove-button"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        delete
      </button>
      <span>{todo.title}</span>
      <i className="secondary-content">
        {todo.completed
          ? <i className="material-icons">Completed</i>
          : <i className="material-icons color-red">In Process</i>}
      </i>
    </>
  );
};
