import React, { FC } from 'react';
import { UserType } from '../../types';
import './User.css';

interface Props {
  user: UserType;
}

export const User: FC<Props> = ({ user }) => (
  <p className="user">{user.name}</p>
);
