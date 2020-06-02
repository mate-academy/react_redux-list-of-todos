import React from 'react';
import { ToDo } from './ToDo';

type Props = {
  todos: PreparedTodos[];
};

export const ToDoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(task => (
        <ToDo task={task} key={task.id} />
      ))}
    </>
  );
};
