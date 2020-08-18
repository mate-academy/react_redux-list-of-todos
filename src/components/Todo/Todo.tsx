import React from 'react';
import { useDispatch } from 'react-redux';
import './Todo.css';
import { User } from '../User/User';
import { deleteTodo } from '../../store';

type TodoProps = {
  todo: Todo;
};

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();

  const onDelete = (id: Number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <span className="title">
        {todo.title}
      </span>

      <User user={todo.user} />

      <span className={`todo__status todo__status-${todo.completed}`}>
        {todo.completed.toString()}
      </span>

      <button type="button" onClick={() => onDelete(todo.id)}>X</button>
    </>
  );
};
