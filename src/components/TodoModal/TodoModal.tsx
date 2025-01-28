import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();

  const selectedTodo = useSelector((state: RootState) => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo?.userId) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => {
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  const handleModalClose = () => {
    dispatch(setCurrentTodo(null));
  };

  if (!selectedTodo) {
    return null;
  }

  const { id, title, completed } = selectedTodo;

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
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span className="has-text-grey">User not available</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};