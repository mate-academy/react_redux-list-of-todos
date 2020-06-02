import React from 'react';
import { User } from './User';
import './ToDo.scss';

type Props = {
  task: PreparedTodos;
};

export const ToDo: React.FC<Props> = ({ task }) => {
  return (
    <div className="todo-card">
      <h2 className="todo-card__task">{task.title}</h2>
      {task.completed
        ? <h3 className="todo-card--finished">Completed</h3>
        : <h3 className="todo-card--unfinished">Not Completed</h3>}

      <User data={task.user} />
    </div>
  );
};
