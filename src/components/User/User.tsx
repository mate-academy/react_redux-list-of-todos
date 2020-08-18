import React from 'react';
import './User.css';

type UserProps = {
  user: User;
};

export const User: React.FC<UserProps> = (props) => {
  const { user } = props;

  return (
    <span className="user">
      {user.name}
    </span>
  );
};
