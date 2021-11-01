import React from 'react';

import { Todos } from '../api/api';

type Props = {
  todo: Todos;
}

const User: React.FC<Props> = ({ todo }) => (
  <div>
    <span className="todo_user-text">Users name: &nbsp;</span>
    {todo.user ? todo.user.name : ''}
  </div>
);

export default User;
