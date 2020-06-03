import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../store';

type Props = {
  todo: TodosFromServer;
};

export const ToDo: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (

    <>

      <li
        key={todo.id}
        className="todo__item"
      >
        <h3 className="todo__item--user">{todo.user.name}</h3>
        <p className="todo__item--text">{todo.title}</p>
        <p
          className={classnames('item__status', {
            item__completed: todo.completed,
          })}
        >
          {todo.completed ? 'Done' : 'In Process'}
        </p>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => dispatch(removeTodo(todo.id))}
        >
          DELETE
        </button>
      </li>

    </>
  );
};
