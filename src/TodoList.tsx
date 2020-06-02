import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, sortTodos } from './store/todos';
import Buttons from './Buttons';
import * as selectors from './store/index';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectors.todosList);
  const sortTitle = useSelector(selectors.field);
  const sortOrder = useSelector(selectors.order);


  switch (sortOrder) {
    case 'DESK':
      switch (sortTitle) {
        case 'user':
        case 'title':
          dispatch(sortTodos(todos
            .sort((a, b) => b[sortTitle].localeCompare(a[sortTitle]))));
          break;
        case 'completed':
          dispatch(sortTodos(todos
            .sort((a, b) => (+a.completed - +b.completed))));
          break;
        default:
      }

      break;
    case 'ASK':
      switch (sortTitle) {
        case 'user':
        case 'title':
          dispatch(sortTodos(todos
            .sort((a, b) => a[sortTitle].localeCompare(b[sortTitle]))));
          break;
        case 'completed':
          dispatch(sortTodos(todos
            .sort((a, b) => (+b.completed - +a.completed))));
          break;
        default:
      }

      break;
    default:
  }


  const deleleTodo = (id: number) => {
    dispatch(deleteTodo(todos.filter(todo => todo.id !== id)));
  };


  return (
    <>
      <Buttons />
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
    </>
  );
};
