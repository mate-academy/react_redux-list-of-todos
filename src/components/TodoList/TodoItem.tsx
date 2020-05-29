import React from 'react';
import cn from 'classnames';

import { useDispatch } from 'react-redux';

import {
  deleteTodo,
} from '../../store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <tr className={cn({ 'is-selected': todo.completed })}>
      <td>
        {todo.id}
      </td>
      <td>
        {todo.user.username}
      </td>
      <td>
        {todo.title}
      </td>
      <td>
        {todo.completed && 'Completed'}
      </td>
      <td>
        <button
          type="button"
          className="button is-small is-danger is-light is-rounded"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
};
