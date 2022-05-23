import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="list__todo"
          >
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
