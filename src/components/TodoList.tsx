import React from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../store';

type Props = {
  todos: Array<TodosFromServer>;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ul className="todo__list">
        {todos.map(todo => (
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
              className="btn btn-danger"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
