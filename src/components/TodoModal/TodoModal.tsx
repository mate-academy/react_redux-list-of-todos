import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [loadedInfo, isLoadedInfo] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  if (!selectedTodo) {
    throw new Error('No todo selected');
  }

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(userFromTodo => setUser(userFromTodo))
      .finally(() => isLoadedInfo(true));
  });

  const onClose = () => {
    dispatch({ type: 'currentTodo/REMOVE' });
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!loadedInfo ? (
        <Loader />
      ) : (
        user && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onClose}
              >
                Close
              </button>
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}

                <a href={user.email}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
