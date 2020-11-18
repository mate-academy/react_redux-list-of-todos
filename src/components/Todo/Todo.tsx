import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Todo.scss';
import { loadUser, currentUser } from '../../store';
import { TodoInterface } from '../../components/interfaces';
import { userFromServer } from '../../api/api';
import classNames from 'classnames';

interface Props {
  todo: TodoInterface;
}

export const Todo = ({ todo }: Props) => {
  const dispatch = useDispatch();

  const getUser = (userId: number) => {
    dispatch(loadUser(userFromServer, userId));
  }

  const user = useSelector(currentUser);

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
        className={classNames(
          'button',
          'TodoList__user-button',
          {
            'TodoList__user-button--selected': user
              ? user.id === todo.userId
              : false,
          },
        )}
        type="button"
        onClick={() => getUser(todo.userId)}
      >
        {`User #${todo.userId}`}
      </button>
    </>
  )
}
