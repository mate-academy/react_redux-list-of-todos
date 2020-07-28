import React from 'react';
import { Todo } from './Interfaces';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {
      todos.map((item: Todo) => (
        <TodoItem key={item.id} todo={item} />
      ))
    }
  </ul>
);
