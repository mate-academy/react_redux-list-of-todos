import React from 'react';
import './TodoCard.css';

type Props = {
  todo: Todo;
}

export const TodoCard: React.FC<Props> = ({ todo }) => (
  <li className="todo__item">
    <h2 className="todo_item-title">{todo.title}</h2>
    <p className="todo__user">{todo.user? todo.user.name : 'Unknown'}</p>
    {todo.completed
      ? <div className="todo__item-completed--true">Completed</div>
      : <div className="todo__item-completed--false">Not completed</div>
    }
  </li>
)
