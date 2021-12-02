import React from 'react';
import { Todo } from './Interfaces';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <li className="list__item">
    <input type="checkbox" checked={todo.completed} />
    <span className="list__item-title">{todo.title}</span>
    <span className="list__item-user">{todo.userName}</span>
  </li>
);
