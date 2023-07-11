import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import { ModalCard } from '../ModalCard';
import { Loader } from '../Loader';

import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  userId: number;
  handleCloseModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ userId, handleCloseModal }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then((res) => setUser(res));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user && currentTodo ? (
        <ModalCard
          user={user}
          currentTodo={currentTodo}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};
