import React, { FC } from 'react';
import { PreparedTodo } from '../interfaces';
import { Todo } from './Todo';


interface Props {
  todos: PreparedTodo[];
}

export const TodosList: FC<Props> = ({ todos }) => {
  return (
    <ul className="todos">
      {todos.map(todo => (
        <li key={todo.id} className="todo">
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
