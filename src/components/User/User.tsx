import React, { FC } from 'react';

interface Props {
  user: User | undefined;
}

export const User: FC<Props> = ({ user }) => {
  return user ? <td className="column">{user.name}</td> : <td />;
};
