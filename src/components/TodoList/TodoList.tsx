import React from 'react';
import { useDispatch } from 'react-redux';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

import {
  todosSortUser,
  todosSortTitle,
  todosSortCompleted
} from '../../store';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const dispatch = useDispatch();

  const sortByTitle = () => {
    dispatch(todosSortTitle());
  };

  const sortByCompleted = () => {
    dispatch(todosSortCompleted());
  };

  const sortByUserName = () => {
    dispatch(todosSortUser());
  };

  return (
    <>
      <button type="button" onClick={sortByTitle}>Sort by Todo title</button>
      <button type="button" onClick={sortByCompleted}>Sort by Completed</button>
      <button type="button" onClick={sortByUserName}>Sort by User</button>
      <ul>
        {
          todos.map(todo => (
            <li className="todo" key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))
        }
      </ul>
    </>
  );
};
