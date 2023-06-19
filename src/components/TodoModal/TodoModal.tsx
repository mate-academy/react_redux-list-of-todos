import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { ModalCard } from '../ModalCard/ModalCard';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentTodo = useAppSelector(selectCurrentTodo);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentTodo) {
        return;
      }

      try {
        const fetchedUser = await getUserById(currentTodo.userId);

        setUser(fetchedUser);
      } catch {
        window.console.log('error');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchUser();
  }, []);

  const isModalCard = isLoaded && user && currentTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded && <Loader />}

      {isModalCard && <ModalCard user={user} todo={currentTodo} />}
    </div>
  );
};
