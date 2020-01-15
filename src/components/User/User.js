import React from 'react';
import { userProps } from '../../constants/proptypes';
import './User.css';

const User = ({ user }) => (
  <span className="todo-list-item__user">{user.name}</span>
);

User.propTypes = userProps;

export default User;
