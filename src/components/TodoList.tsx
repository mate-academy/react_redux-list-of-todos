import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTodos,
  setDelete,
} from '../store';


export const TodoList = () => {
  const todosTodoList = useSelector(getTodos);
  const dispath = useDispatch();

  const deleteTodo = (index: number) => {
    dispath(setDelete(index));
  };

  return (
    <div>
      {todosTodoList.map(({
        completed, user, title, id,
      }) => (
        <div
          className={cn('alert',
            { 'alert-success': completed, 'alert-primary': !completed })}
          key={id}
        >
          <span className="todo-title">{title}</span>
          <span>{user.name}</span>
          <button type="button" onClick={() => deleteTodo(id)}> X</button>
        </div>
      ))}
    </div>
  );
};
