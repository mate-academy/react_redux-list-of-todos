import React, { FC } from 'react';
import { User } from '../User/User';
import { TodoWithUsers } from '../../types';
import './Todo.css';

interface Props {
  todo: TodoWithUsers;
}

export const Todo: FC<Props> = ({ todo }) => {
  const { title, user, completed } = todo;

  return (
    <>
      <p className="todo__title">{title}</p>
      <User user={user} />
      <p className="todo__status">{completed ? 'OK' : '-'}</p>
    </>
  );
};
