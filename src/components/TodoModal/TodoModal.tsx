import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface TodoModalProps {
  onClose: (isOpen: boolean) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const todo = useAppSelector((state: RootState) => state.currentTodo);

  if (!todo) {
    return null;
  }

  const { title, id, completed, userId } = todo;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const fetchedUser = await getUser(userId);

        setTimeout(() => {
          setUser(fetchedUser);
          setIsLoading(false);
        }, 300); // Задержка в 300 мс для проверки лоадера
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке данных пользователя:', error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {id ? `Todo #${id}` : 'Todo'}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title ? `${title}` : null}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
