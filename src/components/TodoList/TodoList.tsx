import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';
import { TodoWithUsers } from '../../types';
import './TodoList.css';

interface Props {
  todos: TodoWithUsers[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li key={todo.id} className="list__item todo">
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
