import React from 'react';
import classNames from 'classnames/bind';

type Props = {
  id: number;
  title: string;
  completed: boolean;
  userId: User;
};

const TodoCard: React.FC<Props> = ({
  id, title, completed, userId,
}) => {
  return (
    <tr className={
      classNames({ 'has-background-success': !completed },
        { 'has-background-info': completed })
    }
    >
      <th>{id}</th>
      <td>{title}</td>
      <td>{completed ? 'completed' : 'active'}</td>
      <td>{userId.name}</td>
    </tr>
  );
};


export default TodoCard;
