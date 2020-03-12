import React, { FC } from 'react';
import { Todoitem } from '../Todoitem/Todoitem';
import { TodoWithUsers } from '../interfaces';

interface Props {
  todos: TodoWithUsers[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <table className="container">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>status</th>
          <th>user</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todoitem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
