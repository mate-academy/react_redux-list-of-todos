import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from './store/todos';
import Buttons from './Buttons';
import { getSortedTodos } from './store/index';

export const TodoList = () => {
  const dispatch = useDispatch();
  const visibleTodos = useSelector(getSortedTodos);

  const deleleTodo = (id: number) => {
    dispatch(deleteTodo(visibleTodos.filter(todo => todo.id !== id)));
  };

  return (
    <>
      <Buttons />
      <div className="todos_container">
        {visibleTodos.map(todo => (
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
    </>
  );
};
