import React from 'react';
import { useDispatch } from 'react-redux';
import './Todo.scss';
import { loadUser } from '../../store';
import { TodoInterface } from '../../components/interfaces';
import { userFromServer } from '../../api/api';

interface Props {
  todo: TodoInterface;
}

export const Todo = ({ todo }: Props) => {
  const dispatch = useDispatch();

  const getUser = (userId: number) => {
    dispatch(loadUser(userFromServer, userId))
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
        <p>{todo.title}</p>
      </label>

      <button
        className="button TodoList__user-button"
        type="button"
        onClick={() => getUser(todo.userId)}
      >
        {`User #${todo.userId}`}
      </button>
    </>
  )
}
