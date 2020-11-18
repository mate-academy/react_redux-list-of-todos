import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Todo.scss';
import { loadUser, currentUser, changeTodoStatus } from '../../store';
import { TodoInterface } from '../../components/interfaces';
import { userFromServer } from '../../api/api';
import classNames from 'classnames';

interface Props {
  todo: TodoInterface;
}

export const Todo = ({ todo }: Props) => {
  const { id, userId, title, completed } = todo
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
          checked={completed}
          readOnly
          onChange={() => dispatch(changeTodoStatus(id))}
        />
        <p>{title}</p>
      </label>

      <button
        className={classNames(
          'button',
          'TodoList__user-button',
          {
            'TodoList__user-button--selected': user
              ? user.id === userId
              : false,
          },
        )}
        type="button"
        onClick={() => getUser(userId)}
      >
        {`User #${userId}`}
      </button>
    </>
  )
}
