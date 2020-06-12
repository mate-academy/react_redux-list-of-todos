import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVisibleTodos } from '../store';
import { deleteTodo } from '../store/todos';


import Button from './Button';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodos);

  return (
    <>
      <ul className="list">
        {todos.map(todo => (
          <li className="card" key={todo.id}>
            <br />
            <span className="card__number">{todo.id}</span>
            <p>
              <strong>User: </strong>
              <i className="user__name">{todo.user?.name}</i>
            </p>
            <p>
              <strong>To-do: </strong>
              <i>{todo.title}</i>
            </p>
            <p>
              <strong>Complete: </strong>
              {
                todo.completed
                  ? <span className="todo__done">Done</span>
                  : <span className="todo__notDone">In process</span>
              }
            </p>
            <Button
              text="Delete todo"
              onClick={() => {
                dispatch(deleteTodo(todo.id));
              }}
            />
          </li>
        ))}
      </ul>
    </>

  );
};

export default TodoList;


// <input
//             type="checkbox"
//             defaultChecked={todo.completed}
//           />
//
