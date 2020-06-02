import React from 'react';

type Props = {
  data: User;
};

export const User: React.FC<Props> = ({ data }) => {
  return (
    <h4 className="todo-card__user">{data.name}</h4>
  );
};
