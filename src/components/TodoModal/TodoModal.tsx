import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeModal } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (currentTodo) {
      const fetchUsers = async () => {
        try {
          setUserLoading(true);

          const userData = await getUser(currentTodo.userId);

          setUser(userData);
        } finally {
          setUserLoading(false);
        }
      };

      fetchUsers();
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {user?.name && (
                <>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
