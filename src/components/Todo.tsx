import React, { FC } from 'react';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
  deleteTodo: (id: number) => void;
}

export const Todo: FC<Props> = ({
  id, title, completed, user, deleteTodo,
}) => (
  <>
    <p className="title">{`${id} ${title}`}</p>
    {completed ? (
      <p className="completed">Yes</p>
    ) : (
      <p className="not-completed">No</p>
    )}
    {user && (
      <p>{user.name}</p>
    )}
    <button
      type="button"
      className="button--close"
      onClick={() => deleteTodo(id)}
    >
      X
    </button>
  </>
);
