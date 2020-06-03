import React from 'react';
import TodoCard from './TodoCard';

type Props = {
  todos: PrepareTodo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: PrepareTodo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </>
  );
};

export default TodoList;
