import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortField, getVisibleTodos, removedTodo } from '../store/index';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodos);

  const removeTodo = (id: number) => {
    dispatch(removedTodo(todos.filter(todo => todo.id !== id)));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(setSortField('title'))}
        className="button"
      >
        sort by title
      </button>
      <button
        type="button"
        onClick={() => dispatch(setSortField('userName'))}
        className="button"
      >
        sort by name
      </button>
      <button
        type="button"
        className="button"
        onClick={() => dispatch(setSortField('status'))}
      >
        sort by status
      </button>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="item"
          >
            <p>{todo.title}</p>
            <p>{todo.user.name}</p>
            <p>{todo.completed ? 'completed' : 'uncompleted'}</p>
            <button
              type="button"
              onClick={() => removeTodo(todo.id)}
              className="button"
            >
              Remove todo
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
