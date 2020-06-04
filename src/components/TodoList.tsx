import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import {
  getTodos,
  setDeleteItem,
  getSort,
} from '../store';


export const TodoList = () => {
  const dispath = useDispatch();
  const todosTodoList = useSelector(getTodos);
  const sortFromRedux = useSelector(getSort);


  const deleteTodo = (index: number) => {
    dispath(setDeleteItem(index));
  };

  const sort = (todos: CompletedTodo[], sortType: string) => {
    switch (sortType) {
      case 'title':
        return [...todos].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });

      case 'completed':
        return [...todos].sort((a, b) => {
          return +a.completed - +b.completed;
        });

      case 'user':
        return [...todos].sort((a, b) => {
          return a.user.name.localeCompare(b.user.name);
        });

      default:
        return todos;
    }
  };

  const SortTodos = sort(todosTodoList, sortFromRedux);

  return (
    <div>
      {SortTodos.map(({
        completed, user, title, id,
      }) => (
        <div
          className={cn('alert',
            { 'alert-success': completed, 'alert-primary': !completed })}
          key={id}
        >
          <span className="todo-title">{title}</span>
          <span>{user.name}</span>
          <button type="button" onClick={() => deleteTodo(id)}> X</button>
        </div>
      ))}
    </div>
  );
};
