import React from 'react';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="todo__list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};
