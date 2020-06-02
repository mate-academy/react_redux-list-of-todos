import React from 'react';
import Todo from './Todo';

type Props = {
  todos: TodoProps[];
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <div>
    <ul className="list">
      {todos.map((todo: TodoProps) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  </div>
);

export default TodoList;
