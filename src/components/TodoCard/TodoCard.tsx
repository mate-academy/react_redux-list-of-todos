import React from 'react';
import './TodoCard.css';

import { useDispatch } from 'react-redux';
import { deleteTodoAction } from '../../store/todos';

type Props = {
  todo: Todo;
}

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const deleteTodo = (id: number) => dispatch(deleteTodoAction(id));

  return (
    <li className="todo__item">
      <h2 className="todo__item-title">
        {todo.title}
        <button
          className="todo__item--btn-delete"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          X
      </button>
      </h2>

      <p className="todo__user">{todo.user ? todo.user.name : 'Unknown'}</p>
      {todo.completed
        ? <div className="todo__item-completed--true">Completed</div>
        : <div className="todo__item-completed--false">Not completed</div>
      }
    </li>
  )

}
