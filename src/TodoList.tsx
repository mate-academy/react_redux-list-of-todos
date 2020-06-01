import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from './store/index';

type Props = {
  todos: Todo[];
};


export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const deleleTodo = (id: number) => {
    dispatch(deleteTodo(todos.filter(todo => todo.id !== id)));
  };

  return (
    <div className="todos_container">
      {todos.map(todo => (
        <div
          key={todo.id}
          className="todo"
        >
          <p className="todo_title">
            {todo.title}
          </p>
          <p className="todo_user">{todo.user}</p>
          {todo.completed
            ? <p className="todo_completed">completed</p>
            : <p className="todo_inprocess">in process</p>}
          <button
            type="button"
            className="todo__button todo__button--delete"
            onClick={() => deleleTodo(todo.id)}
          >
            Delete todo
          </button>
        </div>

      ))}
    </div>
  );
};
