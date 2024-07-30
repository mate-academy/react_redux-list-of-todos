import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface UserPartProps {
  selectedTodo: {
    completed: boolean;
    userId: number;
  };
}

export const UserPart: React.FC<UserPartProps> = ({ selectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [selectedTodo.userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <p className="block" data-cy="modal-user">
      <strong
        className={cn({
          'has-text-success': selectedTodo.completed,
          'has-text-danger': !selectedTodo.completed,
        })}
      >
        {selectedTodo.completed ? 'Done' : 'Planned'}
      </strong>
      {' by '}
      {user ? <a href={`mailto:${user.email}`}>{user.name}</a> : 'Unknown user'}
    </p>
  );
};
