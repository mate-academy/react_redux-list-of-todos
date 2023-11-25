import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const closeModal = () => {
    dispatch(actions.removeTodo());
    setUser(null);
  };

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error fetching user data:', error);
        });
    }
  }, [currentTodo]);

  return (
    <div className={`modal ${currentTodo ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" />

      {user === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
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
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            {currentTodo && user && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={currentTodo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {currentTodo.completed ? 'Done ' : 'Planned '}
                </strong>
                by
                {' '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
