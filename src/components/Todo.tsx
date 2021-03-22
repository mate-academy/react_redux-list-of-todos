import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo, setIsUserSelected, stateTodos, setTodos } from '../store';
import { TodoProps} from '../typesDef';

import cn from 'classnames';

export const Todo: FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const todos = useSelector(stateTodos);

  const handleClick = (id: number) => {
    dispatch(loadUserInfo(id));
    dispatch(setIsUserSelected(true));
  };

  const handleDelete = (todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId)

    dispatch(setTodos(newTodos));
  }

  return (
    <li className={cn('list-group-item',
      {
        'list-group-item-success': todo.completed,
        'list-group-item-danger': !todo.completed,
      })}
    >
      <input type="checkbox" checked={todo.completed} readOnly />
      <span className="ml-1">{todo.title}</span>

      <button
        type="button"
        className="btn btn-danger float-right mr-1"
        onClick={() => handleDelete(todo.id)}
      >
        delete post
      </button>

      <button
        type="button"
        className="btn btn-primary float-right mr-1"
        onClick={() => handleClick(todo.userId)}
      >
        {`user #${todo.userId} info`}
      </button>
    </li>
  );
};
