import React, { FC } from 'react';
import { Users } from '../interfaces';

interface Props {
  user: Users;
}

export const User: FC<Props> = ({ user }) => <>{user.name}</>;
