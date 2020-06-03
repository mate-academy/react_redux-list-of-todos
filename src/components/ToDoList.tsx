import React from 'react';
import { ToDo } from './ToDo';

type Props = {
  todos: Array<TodosFromServer>;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="todo__list">
        {todos.map(todo => (
          <ToDo todo={todo} />
        ))}
      </ul>
    </>
  );
};
