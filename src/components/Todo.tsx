import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../helpers/actions';

export const Todo = ({
  id, title, completed, user,
}: Todo) => {
  const dispatch = useDispatch();

  return (
    <li key={id} className="collection-item avatar">
      <img
        src="https://materializecss.com/images/yuna.jpg"
        alt=""
        className="circle"
      />
      <span className="title">{user.name}</span>
      <p>{title}</p>
      <span
        className="delete"
        onClick={() => dispatch(removeTodo(id))}
      >
        Delete todo
      </span>
      <i className="secondary-content">
        {completed
          ? <i className="material-icons color-green">Completed</i>
          : <i className="material-icons color-red">In Process</i>}
      </i>
    </li>
  );
};
