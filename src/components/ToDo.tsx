import React from 'react';
import { useDispatch } from 'react-redux';
import { User } from './User';
import './ToDo.scss';
import { handleRemove } from '../store';

type Props = {
  task: PreparedTodos;
};

export const ToDo: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-card">
      <button type="button" className="todo-card__remove-btn" onClick={() => dispatch(handleRemove(task.id))}>remove</button>
      <h2 className="todo-card__task">{task.title}</h2>
      {task.completed
        ? <h3 className="todo-card--finished">Completed</h3>
        : <h3 className="todo-card--unfinished">Not Completed</h3>}

      <User data={task.user} />
    </div>
  );
};
