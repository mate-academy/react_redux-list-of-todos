import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      if (currentTodo) {
        const userData = await getUser(currentTodo?.userId);

        setUser(userData);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [currentTodo]);

  const closeModal = () => {
    dispatch(clearCurrentTodo());
  };

  if (!currentTodo) {
    return null;
  }

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
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
