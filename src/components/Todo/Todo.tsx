import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Todo.scss';
import { loadUser, currentUser, changeTodoStatus, removeTodo } from '../../store';
import { TodoInterface } from '../../components/interfaces';
import { userFromServer } from '../../api/api';
import classNames from 'classnames';

interface Props {
  todo: TodoInterface;
}

export const Todo = ({ todo }: Props) => {
  const { id, userId, title, completed } = todo;
  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  const changeStatus = () => {
    dispatch(changeTodoStatus(id));
  };

  const loadUserInfo = () => {
    dispatch(loadUser(userFromServer, userId));
  };

  const setRemoveTodo = () => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={completed}
          readOnly
          onChange={changeStatus}
        />
        <p>{title}</p>
      </label>

      <div className="TodoList_buttons">
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
          onClick={loadUserInfo}
        >
          {`User #${userId}`}
        </button>

        <button
          className="button"
          type="button"
          onClick={setRemoveTodo}
        >
          Remove
        </button>
      </div>
    </>
  )
}
