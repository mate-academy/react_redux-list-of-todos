import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { deletedTodo } from '../store';

type Props = {
  todos: Todo[];
};

export const TodosList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const deleteTodo = (id: number) => {
    dispatch(deletedTodo(todos.filter(todo => todo.id !== id)));
  }

  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          className={cn('todo__item', {
            todo__completed: todo.completed,
          })}
        >
          <p className="todo__title">
            {todo.title}
          </p>
          <p>
            {todo.userCatalog.name}
          </p>
          <p>
            {todo.completed ? 'completed' : 'not completed'}
          </p>
          <button
            type="button"
            className="todo__button todo__button--delete"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete todo
          </button>
        </div>
      ))}
    </>
  );
};
